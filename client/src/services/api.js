import axios from 'axios';

const api = axios.create({
    baseURL: 'https://react-chat--test.herokuapp.com/api/'
});

export default api;