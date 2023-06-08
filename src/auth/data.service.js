import axios from 'axios';
import authHeader, { authHeaderPhoto } from './auth.headers';

const BASE_URL = "http://miomi.by/api/"

class DataService {
    async addNewAnimal(data) {
        return await axios.post(BASE_URL + 'animal/v1/add', { ...data }, { headers: authHeader() }).then(res => {
            return res.data
        });
    }



    addNewNews(data) {
        return axios.get(BASE_URL + '', { ...data }, { headers: authHeader() });
    }

    async addPhotoNews(file) {
        let bodyFromData = new FormData();
        bodyFromData.append("file", file);
        return await axios.post(`${BASE_URL}file/v1/addNews`, bodyFromData, {
            headers: authHeaderPhoto(),
        }).then((res) => res.data)
    }

    async addPhotoAnimal(file) {
        let bodyFromData = new FormData();
        bodyFromData.append("file", file);
        return await axios
            .post(`${BASE_URL}file/v1/add`, bodyFromData, {
                headers: authHeaderPhoto(),
            })
            .then((res) => res.data)
    }

}

export default new DataService();