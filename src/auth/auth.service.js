import axios from "axios";
import { LOGIN_ENDPOINT, SIGNUP_ENDPOINT } from "../endpoints";

class AuthService {
    async login(email, password) {
        return await axios
            .post(LOGIN_ENDPOINT, {
                email,
                password
            })
            .then(response => {
                if (response.data) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    axios.defaults.headers.common.Authorization = `Bearer ${response.data}`;
                }

                return response.data;
            });
    }

    async signup(first_name, last_name, password, email, phone, address) {
        return  await axios.post(SIGNUP_ENDPOINT, {
            first_name, last_name,
            password, email,
            phone, address
        }).then(response => {
            if (response.data) {
                localStorage.setItem("user", JSON.stringify(response.data));
                axios.defaults.headers.common.Authorization = `Bearer ${response.data}`;
            }

            return response.data
        })
    }

    logout() {
        localStorage.removeItem("user");
        delete axios.defaults.headers.common.Authorization;
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();