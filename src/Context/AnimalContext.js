import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import UserService from "../auth/user.service";
import { useNavigate } from "react-router";

export const AnimalContext = createContext();

export function AnimalContextProvider({ children }) {
    const navigate = useNavigate()

    const [isLogin, setIsLogin] = useState(false)
    const [animalsData, setAnimalsData] = useState([]);
    const [newsData, setNewsData] = useState([]);
    const [userData, setUserData] = useState({})
    const [userKey, setUserKey] = useState()

    const baseURL = "http://miomi.by:9000"

    useEffect(() => {
        setUserKey(localStorage.getItem("user"))
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
        else {
            setIsLogin(false)
            setUserData([])
        }
    }, [userKey])

    const logout = () => {
        setUserKey(localStorage.getItem("user"))
        setIsLogin(false)
        setUserData([])
    }

    const updateAnimals = async () => {
        await axios.get(`http://miomi.by/api/animal/v1/`).then((res) => {
            setAnimalsData(res.data);
        });
    }

    const updateNews = async () => {
        await axios.get(`http://miomi.by/api/news/v1/`).then((res) => {
            setNewsData(res.data);
        });
    }

    const login = () => {
        setIsLogin(true)
        UserService.getUserInfo().then(res => setUserData(res.data.data)).catch(er => { })
        navigate("/")
    }

    const updateUserInfo = () => {
        UserService.getUserInfo().then(res => setUserData(res.data.data)).catch(er => { })
    }

    return (
        <AnimalContext.Provider
            value={{ animalsData, baseURL, isLogin, setIsLogin, userData, newsData, logout, login, updateUserInfo, updateAnimals, updateNews }}
        >
            {children}
        </AnimalContext.Provider>
    );
}

export function useAnimalContext() {
    return useContext(AnimalContext);
}