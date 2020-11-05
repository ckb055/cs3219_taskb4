import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://taskb4-cs3219.firebaseio.com/'
});

export default instance;