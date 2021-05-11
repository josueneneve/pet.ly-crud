import axios from 'axios';

const api = axios.create({
    baseURL: 'https://atividade-prog3.herokuapp.com'
});

export default api;
