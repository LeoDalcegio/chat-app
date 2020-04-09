const bcrypt = require('bcryptjs');


module.exports = {

    async encrypt(password){
        const salt = await bcrypt.genSalt(10);
            
        const hashPassword = await bcrypt.hash(password, salt);

        return hashPassword;
    },

    async comparePasswords(password, hashPassword){
        return await bcrypt.compare(password, hashPassword);
    }
}