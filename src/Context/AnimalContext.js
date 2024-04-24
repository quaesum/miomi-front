import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import UserService from "../auth/user.service";
import { json, useNavigate } from "react-router";
import AuthService from "../auth/auth.service";
import authHeader from '../auth/auth.headers';
import { GET_ALL_NEWS_ENDPOINT, GET_ANIMALS_ENDPOINT, GET_FILE_NAMES_AND_IDS_ENDPOINT, SERVICE_FILES_URL, SERVICE_STORAGE_URL } from "../endpoints";

export const AnimalContext = createContext();

export function AnimalContextProvider({ children }) {
    const navigate = useNavigate()

    const [isLogin, setIsLogin] = useState(false)
    const [currentTab, setCurrentTab] = useState(0)
    const [animalsData, setAnimalsData] = useState([]);
    const [maxPages, setMaxPages] = useState(1);
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

    useEffect(() => {
        setUserKey(localStorage.getItem("user"))
        axios.post(GET_ANIMALS_ENDPOINT, { headers: authHeader(), request: "", page: currentTab + 1, per_page: 21}).then((res) => {
            setAnimalsData(res.data.animals);
            setMaxPages(res.data.max_page)
        });
        axios.get(GET_ALL_NEWS_ENDPOINT,  {headers: authHeader}).then((res) => {
            setNewsData(res.data);
        });
        axios.get(GET_FILE_NAMES_AND_IDS_ENDPOINT, {headers: authHeader}).then((res) =>
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

    const updateAnimals = async (page) => {
        await axios.post(GET_ANIMALS_ENDPOINT, { headers: authHeader(), request: "", page: page, per_page: 21}).then((res) => {
            setAnimalsData(res.data.animals);
        });
    }

    const updateNews = async () => {
        await axios.get(GET_ALL_NEWS_ENDPOINT).then((res) => {
            setNewsData(res.data);
        });
    }

    const updateUrls = async () => {
        await axios.get(GET_FILE_NAMES_AND_IDS_ENDPOINT, {headers: authHeader}).then((res) =>
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
                animalsData, setAnimalsData,
                SERVICE_STORAGE_URL, isLogin, setIsLogin,
                userData, newsData, logout,
                login, updateUserInfo, updateAnimals,
                updateNews, updateUrls, urlsImages, donations,
                currentTab, setCurrentTab, maxPages, setMaxPages
            }}
        >
            {children}
        </AnimalContext.Provider>
    );
}

export function useAnimalContext() {
    return useContext(AnimalContext);
}