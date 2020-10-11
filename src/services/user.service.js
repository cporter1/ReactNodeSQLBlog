import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://10.0.0.164:3001'

class UserService {

    getpublicContent() {
        return axios.get(API_URL +'all');
    }
}

export default new UserService();