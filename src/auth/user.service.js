import axios from 'axios';
import authHeader from './auth.headers';

const BASE_URL = "http://miomi.by/api/"

class UserService {
    getUserInfo() {
        return axios.get(BASE_URL + 'user/v1/info', { headers: authHeader() });
    }
}

export default new UserService();