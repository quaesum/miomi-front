import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import UserService from "../auth/user.service";

export const AnimalContext = createContext();

export function AnimalContextProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false)
    const [animalsData, setAnimalsData] = useState([]);
    const [newsData, setNewsData] = useState([]);
    const [userData, setUserData] = useState({})

    const baseURL = "http://miomi.by:9000"
    const userKey = localStorage.getItem("user")
    const handleDeleteAnimal = (id) => {
        console.log('Delete:' + id)
    }

    useEffect(() => {
        axios.get(`http://miomi.by/api/animal/v1/`).then((res) => {
            setAnimalsData(res.data);
        });
        axios.get(`http://miomi.by/api/news/v1/`).then((res) => {
            setNewsData(res.data);
        });
    }, [])

    useEffect(() => {
        if (userKey) {
            setIsLogin(true)
            UserService.getUserInfo().then(res => setUserData(res.data.data)).catch(er => { })
        }
        else setIsLogin(false)
    }, [userKey])

    return (
        <AnimalContext.Provider
            value={{ animalsData, baseURL, isLogin, setIsLogin, handleDeleteAnimal, userData, newsData }}
        >
            {children}
        </AnimalContext.Provider>
    );
}

export function useAnimalContext() {
    return useContext(AnimalContext);
}