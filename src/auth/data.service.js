import axios from 'axios';
import authHeader, { authHeaderPhoto } from './auth.headers';

const BASE_URL = "http://miomi.by/api/"

class DataService {
    async addNewAnimal(data) {
        return await axios.post(BASE_URL + 'animal/v1/add', { ...data }, { headers: authHeader() }).then(res => res.data);
    }

    async addNewNews(data) {
        return await axios.post(BASE_URL + 'news/v1/add', { ...data }, { headers: authHeader() }).then(res => res.data);
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

    async deleteAnimal(id) {
        return await axios
            .post(`${BASE_URL}news/v1/remove/${id}`, {}, {
                headers: authHeaderPhoto(),
            })
            .then((res) => res.data)
    }

}

export default new DataService();