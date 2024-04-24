import axios from 'axios';
import authHeader from './auth.headers';
import { GET_USER_INFO_ENDPOINT, UPDATE_USER_ENDPOINT } from '../endpoints';

class UserService {
    getUserInfo() {
        return axios.get(GET_USER_INFO_ENDPOINT, { headers: authHeader() }).catch(er => {
            localStorage.removeItem("user")
        });
    }

    chageUserIformation(values) {
        return axios.post(
            UPDATE_USER_ENDPOINT,
            { ...values },
            { headers: authHeader() }
        )
            .then((res) => console.log(res));
    }
}

export default new UserService();