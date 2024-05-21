import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import UserService from "../auth/user.service";
import { json, useNavigate } from "react-router";
import AuthService from "../auth/auth.service";
import authHeader from '../auth/auth.headers';
import * as fal from "@fal-ai/serverless-client";
import { GET_ALL_NEWS_ENDPOINT, 
    GET_ANIMALS_ENDPOINT, 
    FAL_KEY, 
    GET_FILE_NAMES_AND_IDS_ENDPOINT, 
    SERVICE_STORAGE_URL, 
    GET_ALL_PRODUCTS_ENDPOINT, 
    GET_ALL_SERVICE_ENDPOINT,
    GET_ALL_SHELTERS_INFO,
    GET_SHELTER_BY_ID,
    GET_ALL_USERS_INFO_HANDLER,
    GET_ALL_INVITATIONS
} from "../endpoints";

export const AnimalContext = createContext();

fal.config({
    credentials: FAL_KEY,
  });

export function AnimalContextProvider({ children }) {
    const navigate = useNavigate()

    const [isLogin, setIsLogin] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userShelter, setUserShelter] = useState();
    const [allUsersInfo, setAllUsersInfo] = useState();
    const [userInvitations, setUserInvitations] = useState();
    const [showInvitations, setShowInvitations] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [currentTab, setCurrentTab] = useState(0);
    const [animalsData, setAnimalsData] = useState([]);
    const [maxAnimalsPages, setMaxAnimalsPages] = useState(1);
    const [maxProductsPages, setMaxProductsPages] = useState(1);
    const [maxServicesPages, setMaxServicesPages] = useState(1);
    const [newsData, setNewsData] = useState([]);
    const [userData, setUserData] = useState({});   
    const [urlsImages, setUrlsImages] = useState([]);
    const [userKey, setUserKey] = useState();
    const [servicesData, setServicesData] = useState([]);
    const [productsData, setProductsData] = useState([])
    const [currentAnimalPage, setCurrentAnimalPage] = useState(1);
    const [currentProductPage, setCurrentProductPage] = useState(1);
    const [currentServicesPage, setCurrentServicesPage] = useState(1);
    const [request, setRequest] = useState('')

    useEffect(() => {
        setUserKey(localStorage.getItem("user"))
        axios.post(GET_ANIMALS_ENDPOINT, { headers: authHeader(), request: "", page: currentTab + 1, per_page: 21}).then((res) => {
            setAnimalsData(res.data.animals);
            setMaxAnimalsPages(res.data.max_page)
        });
        axios.get(GET_ALL_NEWS_ENDPOINT,  {headers: authHeader}).then((res) => {
            setNewsData(res.data);
        });
        axios.get(GET_FILE_NAMES_AND_IDS_ENDPOINT, {headers: authHeader}).then((res) =>
            setUrlsImages(res.data));
        axios.post(GET_ALL_PRODUCTS_ENDPOINT,  {headers: authHeader, request: "", page: currentTab + 1, per_page: 21}).then((res) => {
            setProductsData(res.data.products);
            setMaxProductsPages(res.data.max_page)
        });
        axios.post(GET_ALL_SERVICE_ENDPOINT,  {headers: authHeader, request: "", page: currentTab + 1, per_page: 21}).then((res) => {
            setServicesData(res.data.services);
            setMaxServicesPages(res.data.max_page)
        });
    }, [])

    useEffect(() => {
        if (userKey) {
            setIsLogin(true)
            getInvitations()
            UserService.getUserInfo().then(res => {
                setUserData(res.data.data)
                setIsAdmin(res.data.data.role == "admin" ? true : false)
                setIsVerified(res.data.data.isVerified)
                setAvatar()
                getShelterByID(res.data.data.shelter_id)
            }).catch(er => logout())
        }
        else {
            setIsLogin(false)
            setIsAdmin(false)
            setIsVerified(false)
            setUserData([])
            setAvatarUrl("")
        }
    }, [userKey])

    const logout = () => {
        setUserKey(localStorage.getItem("user"))
        setIsLogin(false)
        setUserData([])
        setIsAdmin(false)
        setIsVerified(false)
        setAvatarUrl("")
    }

    const updateAnimals = async (page, filters) => {
        if (page < 1) page = 1
        await axios.post(GET_ANIMALS_ENDPOINT, { headers: authHeader(), request: request, page: page, per_page: 21, filters: filters}).then((res) => {
            setAnimalsData(res.data.animals);
            setMaxAnimalsPages(res.data.max_page)
        });
    }

    const setAvatar = async () => {
        const result = await fal.run("fal-ai/fast-lightning-sdxl", {
            input: {
              prompt: "a cute realistic animal",
            },
          });
        setAvatarUrl(result.images[0].url)
    }

    const updateNews = async () => {
        await axios.get(GET_ALL_NEWS_ENDPOINT).then((res) => {
            setNewsData(res.data);
        });
    }

    const updateProducts = async (page) => {
        if (page < 1) page = 1
        await axios.post(GET_ALL_PRODUCTS_ENDPOINT, { headers: authHeader(), request: request, page: page, per_page: 21}).then((res) => {
            setProductsData(res.data.products);
            setMaxProductsPages(res.data.max_page)
        });
    }

    const updateServices = async (page) => {
        if (page < 1) page = 1
        await axios.post(GET_ALL_SERVICE_ENDPOINT, { headers: authHeader(), request: request, page: page, per_page: 21}).then((res) => {
            setServicesData(res.data.services);
            setMaxServicesPages(res.data.max_page)
        });
    }

    const updateUrls = async () => {
        await axios.get(GET_FILE_NAMES_AND_IDS_ENDPOINT, {headers: authHeader()}).then((res) =>
            setUrlsImages(res.data))
    }

    const getAllUsers = async () => {
        await axios.get(GET_ALL_USERS_INFO_HANDLER, {},{headers: authHeader()}).then((res) => {
            setAllUsersInfo(res.data)
        })
    }

    const login = () => {
        setIsLogin(true)
        UserService.getUserInfo().then(res => {
            setUserData(res.data.data)
            setIsAdmin(res.data.data.role == "admin" ? true : false)
            setIsVerified(res.data.data.isVerified)
        }
        ).catch(er => { })
        navigate("/")
    }

    const updateUserInfo = () => {
        UserService.getUserInfo().then(res => {
            setUserData(res.data.data)
            setIsAdmin(res.data.data.role == "admin" ? true : false)
            setIsVerified(res.data.data.isVerified)
        }).catch(er => {
            AuthService.logout()
            logout()
        })
    }

    const getShelterByID = async (id) => {
        await axios.get(`${GET_SHELTER_BY_ID}${id}`, {headers: authHeader}).then((res) => {
            setUserShelter(res.data.data)
        })
    }

    const getInvitations = async () => {
        await axios.get(GET_ALL_INVITATIONS, { headers: authHeader() }).then((res) => {
            setUserInvitations(res.data)
            if (res.data.lenght > 0)  {
                setShowInvitations(true)
            }
        })
    }

    const handleSearch = (filters) => {
        switch (currentTab + 1){
            case 1: updateAnimals(currentAnimalPage, filters)
            case 3: updateProducts(currentProductPage)
            case 4: updateServices(currentServicesPage)
        }
    }

    return (
        <AnimalContext.Provider
            value={{
                animalsData, setAnimalsData,
                productsData, setProductsData,
                servicesData, setServicesData,
                SERVICE_STORAGE_URL, isLogin, setIsLogin,
                userData, newsData, logout, login, 
                updateUserInfo, updateAnimals, updateServices, updateNews, updateUrls, 
                urlsImages, avatarUrl,
                currentTab, setCurrentTab, 
                maxAnimalsPages, setMaxAnimalsPages,
                maxProductsPages, setMaxProductsPages,
                maxServicesPages, setMaxServicesPages,
                handleSearch,
                currentAnimalPage, setCurrentAnimalPage,
                currentProductPage, setCurrentProductPage,
                currentServicesPage, setCurrentServicesPage,
                request, setRequest, userShelter,
                isAdmin, isVerified, getShelterByID,
                getAllUsers, allUsersInfo, userInvitations,
                showInvitations, setShowInvitations, getInvitations
            }}
        >
            {children}
        </AnimalContext.Provider>
    );
}

export function useAnimalContext() {
    return useContext(AnimalContext);
}