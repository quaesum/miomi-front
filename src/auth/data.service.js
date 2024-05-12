import axios from 'axios';
import authHeader, { authHeaderPhoto } from './auth.headers';
import { ADD_ANIMAL_ENDPOINT, ADD_ANIMAL_PHOTO_ENDPOINT, ADD_NEWS_ENDPOINT, ADD_NEWS_PHOTO_ENDPOINT, ADD_SERVICE_ENDPOINT, ADD_SERVICE_PHOTO_ENDPOINT, REMOVE_ANIMAL_ENDPOINT, REMOVE_NEWS_ENDPOINT, REMOVE_SERVICE_ENDPOINT, UPDATE_ANIMAL_ENDPOINT, UPDATE_NEWS_ENDPOINT, UPDATE_SERVICE_ENDPOINT } from '../endpoints';

class DataService {
    async addNewAnimal(data) {
        return await axios.post(ADD_ANIMAL_ENDPOINT, { ...data }, { headers: authHeader()}).then(res => res.data);
    }

    async updateAnimal(data, id) {
        return await axios.post(`${UPDATE_ANIMAL_ENDPOINT}${id}`, { ...data }, { headers: authHeader() }).then(res => res.data);
    }

    async addNewNews(data) {
        return await axios.post(ADD_NEWS_ENDPOINT, { ...data }, { headers: authHeader() }).then(res => res.data);
    }

    async updateNews(data, id){
        return await axios.post(`${UPDATE_NEWS_ENDPOINT}${id}`, { ...data }, { headers: authHeader() }).then(res => res.data);
    }

    async addService(data) {
        return await axios.post(ADD_SERVICE_ENDPOINT, {...data}, {headers: authHeader()}).then(res => res.data);
    }

    async updateService(data, id) {
        return await axios.post(`${UPDATE_SERVICE_ENDPOINT}${id}`, { ...data }, {headers: authHeader()}).then(res => res.data)
    }

    async addPhotoNews(file) {
        let bodyFromData = new FormData();
        bodyFromData.append("file", file);
        return await axios.post(ADD_NEWS_PHOTO_ENDPOINT, bodyFromData, {
            headers: authHeaderPhoto(),
        }).then((res) => res.data)
    }

    async addPhotoAnimal(file) {
        let bodyFromData = new FormData();
        bodyFromData.append("file", file);
        return await axios
            .post(ADD_ANIMAL_PHOTO_ENDPOINT, bodyFromData, {
                headers: authHeaderPhoto(),
            })
            .then((res) => res.data)
    }

    async addPhotoService(file) {
        let bodyFromData = new FormData();
        bodyFromData.append("file", file);
        return await axios
            .post(ADD_SERVICE_PHOTO_ENDPOINT, bodyFromData, {
                headers: authHeaderPhoto(),
            })
            .then((res) => res.data)
    }

    async deleteAnimal(id) {
        return await axios
            .post(`${REMOVE_ANIMAL_ENDPOINT}/${id}`, {}, {
                headers: authHeader(),
            })
            .then((res) => res.data)
    }

    async deleteNews(id) {
        return await axios
            .post(`${REMOVE_NEWS_ENDPOINT}${id}`, {}, {
                headers: authHeader(),
            })
            .then((res) => res.data)
    }

    async deleteService(id) {
        return await axios
            .post(`${REMOVE_SERVICE_ENDPOINT}${id}`, {}, {
                headers: authHeader(),
            })
            .then((res) => res.data)
    }

}

export default new DataService();