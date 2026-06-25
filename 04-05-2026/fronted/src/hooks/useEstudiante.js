import { useState, useEffect } from "react";
import { api } from "../utils/api"
import { getId } from "../utils/normalizador";

//Gestionar el estado y las conexiones a la API que afecta al estado
export const useEstudiante = () => {
    //Variable de estado
    const [estudiantes, setEstudiantes] = useState([]);
    //Para renderizar por primera vez
    useEffect(() => {
        const token = sessionStorage.getItem('token')
        if (!token) {
            console.log("no hay token")
            return
        }
        api.get("/estudiantes", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setEstudiantes(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    //Para agregar nuevo estudiante
    const agregarEstudiante = (nuevoEstudiante) => {
        
        return api.post("/estudiantes", nuevoEstudiante)
            .then((res) => {
                setEstudiantes(prev => ([...prev, res.data]))
            })
            .catch((err) => {
                const mensaje = err.response?.data?.message ?? "Error al registrar";
                console.log(mensaje);
                throw mensaje;
            })

    }

    const eliminarEstudiante = (id) => {
        const token = sessionStorage.getItem('token')
        if (!token) {
            console.log("no hay token")
            return
        }
        api.delete(`/estudiantes/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

            .then(() => {
                console.log("Estuidante eliminado", id)
                setEstudiantes(prev => prev.filter(e => getId(e) !== id))
            })
            .catch(err => console.log(err))
    }

    const editarEstudiante = (editadoEstudiante) => {
        const id = getId(editadoEstudiante)
        const token = sessionStorage.getItem('token')
        if (!token) {
            console.log("no hay token")
            return
        }
        return api.put(`/estudiantes/${id}`, editadoEstudiante, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => setEstudiantes(prev =>
                prev.map(e => getId(e) === id ? res.data : e)
            ))
            .catch(err => console.log(err))
    }

    //logging
    const login = (estudianteLogin) => {
        return api.post("/estudiantes/login", estudianteLogin)
            .then(res => {
                console.log(res.data.message);
                const token = res.data.token;
                sessionStorage.setItem('token', token);
                return res.data;
            })
            .catch(err => {
                const mensaje = err.response?.data?.message ?? "Error al iniciar sesión";
                console.log(mensaje);
                throw mensaje;
            })
    }

    const getEstudiante = (id) => {
        const token = sessionStorage.getItem('token')
        if (!token) {
            console.log("no hay token")
            return
        }
        return api.get(`/estudiantes/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

            .catch(err => console.log(err))
    }
    return { estudiantes, agregarEstudiante, eliminarEstudiante, editarEstudiante, login, getEstudiante };
}
