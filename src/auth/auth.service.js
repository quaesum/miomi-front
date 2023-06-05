import axios from "axios";

const BASE_URL = "http://miomi.by/api/"

class AuthService {
    login(email, password) {
        return axios
            .post(BASE_URL + "login", {
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
        return axios.post(BASE_URL + "signup", {
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