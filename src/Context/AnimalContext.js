import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AnimalContext = createContext();

export function AnimalContextProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false)
    const [animalsData, setAnimalsData] = useState([]);
    const baseURL = "http://miomi.by:9000"

    const handleDeleteAnimal = (id) => {
        console.log('Delete:' + id)
    }

    useEffect(() => {
        axios.get(`http://miomi.by/api/animal/v1/`).then((res) => {
            setAnimalsData(res.data);
        });
    }, [])
    return (
        <AnimalContext.Provider
            value={{ animalsData, baseURL, isLogin, setIsLogin, handleDeleteAnimal }}
        >
            {children}
        </AnimalContext.Provider>
    );
}

export function useAnimalContext() {
    return useContext(AnimalContext);
}