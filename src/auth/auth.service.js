import axios from "axios";
import { LOGIN_ENDPOINT, SIGNUP_ENDPOINT } from "../endpoints";

class AuthService {
    login(email, password) {
        return axios
            .post(LOGIN_ENDPOINT, {
                email,
                password
            })
            .then(response => {
                if (response.data) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    signup(first_name, last_name, password, email, phone, address) {
        return axios.post(SIGNUP_ENDPOINT, {
            first_name, last_name,
            password, email,
            phone, address
        }).then(response => {
            if (response.data) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data
        })
    }

    logout() {
        localStorage.removeItem("user");
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();