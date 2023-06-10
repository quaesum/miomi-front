import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import UserService from "../auth/user.service";
import { useNavigate } from "react-router";
import AuthService from "../auth/auth.service";

export const AnimalContext = createContext();

export function AnimalContextProvider({ children }) {
    const navigate = useNavigate()

    const [isLogin, setIsLogin] = useState(false)
    const [animalsData, setAnimalsData] = useState([]);
    const [newsData, setNewsData] = useState([]);
    const [userData, setUserData] = useState({})
    const [donations, setDonations] = useState([
        {
            id: 1,
            label: "Пожертвование Суперкот",
            description: "Через систему «Расчет» (ЕРИП): Благотворительность, общественные объединения >> Защита животных >> Суперкот >> Благотворительный взнос\nНа расчетный счет: BY69BPSB31351026340179330000 в ОАО «БПС-Сбербанк», г. Минск, BIC BPSBBY2X Получатель: МБООПЖ «Суперкот», УНП 194901770, назначение платежа: «Пожертвование»"
        }
    ])
    const [urlsImages, setUrlsImages] = useState([])
    const [userKey, setUserKey] = useState()

    const baseURL = "http://miomi.by:9000" //images
    const BASE_URL = "http://miomi.by/api/"

    useEffect(() => {
        setUserKey(localStorage.getItem("user"))
        axios.get(`${BASE_URL}animal/v1/`).then((res) => {
            setAnimalsData(res.data);
        });
        axios.get(`${BASE_URL}news/v1/`).then((res) => {
            setNewsData(res.data);
        });
        axios.get(`${BASE_URL}file/v1/getUrl`).then((res) =>
            setUrlsImages(res.data))
    }, [])

    useEffect(() => {
        if (userKey) {
            setIsLogin(true)
            UserService.getUserInfo().then(res => setUserData(res.data.data)).catch(er => logout())
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
        await axios.get(`${BASE_URL}animal/v1/`).then((res) => {
            setAnimalsData(res.data);
        });
    }

    const updateNews = async () => {
        await axios.get(`${BASE_URL}news/v1/`).then((res) => {
            setNewsData(res.data);
        });
    }

    const updateUrls = async () => {
        await axios.get(`${BASE_URL}file/v1/getUrl`).then((res) =>
            setUrlsImages(res.data))
    }

    const login = () => {
        setIsLogin(true)
        UserService.getUserInfo().then(res => setUserData(res.data.data)).catch(er => { })
        navigate("/")
    }

    const updateUserInfo = () => {
        UserService.getUserInfo().then(res => setUserData(res.data.data)).catch(er => {
            AuthService.logout()
            logout()
        })
    }

    return (
        <AnimalContext.Provider
            value={{
                animalsData,
                baseURL, isLogin, setIsLogin,
                userData, newsData, logout,
                login, updateUserInfo, updateAnimals,
                updateNews, updateUrls, urlsImages, donations
            }}
        >
            {children}
        </AnimalContext.Provider>
    );
}

export function useAnimalContext() {
    return useContext(AnimalContext);
}