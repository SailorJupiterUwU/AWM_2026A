import { useState, useEffect } from "react";
import { api } from "../utils/api";
import { jwtDecode } from "jwt-decode";

export const useUser = () => {
    const [users, setUser] = useState([]);
    const agregarUser = (nuevoUser) => {
        return api.post("/api/user", nuevoUser)
            .catch((err) => {
                const mensaje = err.response?.data?.message ?? "Error al agregar nuevo usuario";
                throw mensaje;
            })
    }

    const loginUser = (User) => {
        return api.post("/api/login", User)
            .then(res => {
                const token = res.data.token;
                const payload = jwtDecode(token);
                sessionStorage.setItem('token', token);
                sessionStorage.setItem("rol", payload.rol);
            })
            .catch((err) => {
                const mensaje = err.response?.data?.message ?? "Error al iniciar sesion";
                throw mensaje;
            })
    }
    return { agregarUser, loginUser };
}