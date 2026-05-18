//Objetivo: crear una instancia personalizada de axio spara conectarnos a la API con
//configuraciones de nuestro interes
import axios from "axios"
//instancia personalizada de api
export const api = axios.create(
    {
        baseURL: import.meta.env.VITE_URL_BASE
    }
);