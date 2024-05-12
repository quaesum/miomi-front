import axios from 'axios';
import authHeader from './auth.headers';
import { GET_USER_INFO_ENDPOINT, UPDATE_USER_ENDPOINT } from '../endpoints';

class UserService {
    async getUserInfo() {
        return axios.get(GET_USER_INFO_ENDPOINT, { headers: authHeader() }).catch(er => {
            localStorage.removeItem("user")
        });
    }

    async getUserInfoByID (id){
        return axios.get(`${GET_USER_INFO_ENDPOINT}/${id}`, { headers: authHeader() }).catch( er => {
            
        })
    }

    async chageUserIformation(values) {
        return axios.post(
            UPDATE_USER_ENDPOINT,
            { ...values },
            { headers: authHeader() }
        )
            .then((res) => console.log(res));
    }
}

export default new UserService();