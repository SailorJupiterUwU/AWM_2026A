import axios from "axios";
// Crear una instancia personalizada de axios para conectarnos a la API con configuraciones específicas
export const api = axios.create(
    {
        baseURL: import.meta.env.VITE_URL_BASE
    }
);