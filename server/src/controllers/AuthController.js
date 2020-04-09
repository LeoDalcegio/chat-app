const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../modules/mailer');
const passwordValidation = require('../util/passwordValidation');

module.exports = {
    async login(request, response) {
        const { email } = request.body;

        try{
            const user = await User.findOne({ email }).select('+password')

            if(!user) return response.status(400).send({error: 'Email or password is wrong'});

            const validPassword = await passwordValidation.comparePasswords(request.body.password, user.password);
            
            if(!validPassword) return response.status(401).send({error: 'Invalid password'});

            const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
                expiresIn: 604800,
            });

            user.password = undefined;
            
            return response.header('auth-token', token).send(user);
        }catch(err){
            return response.status(401).send(err);
        }
    },

    async register(request, response){
        const { email } = request.body;

        const emailExist = await User.findOne({ email })
    
        if(emailExist) return response.status(409).send({error: 'Email already exist'});
    
        const hashPassword = await passwordValidation.encrypt(request.body.password);
        
        const user = new User({
            name: request.body.name,
            email: request.body.email,
            password: hashPassword
        });
    
        try{ 
            await user.save();

            user.password = undefined;
            
            return response.send(user);
        }catch(err){
            return response.status(400).send(err);
        }
    },

    async forgotPassword(request, response){
        const { email } = request.body;

        try {
            const user = await User.findOne({ email: email });

            if(!user)
                return response.status(404).send({error: 'User not found'});

            const token = crypto.randomBytes(20).toString('hex');

            const nowPlusOneHour = new Date();
            nowPlusOneHour.setHours(nowPlusOneHour.getHours() + 1);

            await User.findByIdAndUpdate(user._id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: nowPlusOneHour
                }
            });

            mailer.sendMail({
                to: email,
                from: 'leoodalcegio@hotmail.com',
                template: 'forgot-password',
                context: { token },
            }, (err) => {
                if(err)
                    return response.status(400).send({ error: 'Cannot send forgot password email'});
                
                return response.send();
            });
            
        }catch(err){
            return response.status(400).send({ error: 'Error on forgot password, try again' + err });;
        }
    },

    async resetPassword(request, response){
        const { email, token, password } = request.body;

        try{
            const user = await User.findOne({ email }).select('+passwordResetToken passwordResetExpires');

            if(!user)
                return response.status(404).send({ error: 'User not found' });

            if(token !== user.passwordResetToken)
                return response.status(404).send({ error: 'Invaid token' });

            const now = new Date();

            if(now > user.passwordResetExpires)
                return response.status(400).send({ error: 'Token expired, generate a new one' });
            
            user.password = await passwordValidation.encrypt(password);

            await user.save();

            response.send();
        }catch(err){
            return response.status(400).send({ error: 'Cannot reset password, try again' });;
        }
    }
}
