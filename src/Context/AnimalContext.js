import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AnimalContext = createContext();

export function AnimalContextProvider({ children }) {
    const [animalsData, setAnimalsData] = useState([]);
    const baseURL = "http://miomi.by:9000"

        useEffect(() => {
            axios.get(`http://miomi.by/api/animal/v1/`).then((res) => {
                setAnimalsData(res.data);
            });
        }, [])
    return (
        <AnimalContext.Provider
            value={{ animalsData, baseURL }}
        >
            {children}
        </AnimalContext.Provider>
    );
}

export function useAnimalContext() {
    return useContext(AnimalContext);
}