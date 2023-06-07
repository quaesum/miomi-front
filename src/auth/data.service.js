import axios from 'axios';
import authHeader from './auth.headers';

const BASE_URL = "http://miomi.by/api/"

class DataService {
    addNewAnimal(data) {
        return axios.get(BASE_URL + '', {...data}, { headers: authHeader() });
    }

    addNewNews(data) {
        return axios.get(BASE_URL + '', {...data}, { headers: authHeader() });
    }

}

export default new DataService();