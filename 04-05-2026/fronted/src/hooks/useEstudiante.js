import { useState, useEffect } from "react";
import { api } from "../utils/api"
import { getId } from "../utils/normalizador";

//Gestionar el estado y las conexiones a la API que afecta al estado
export const useEstudiante = () => {
    //Variable de estado
    const [estudiantes, setEstudiantes] = useState([]);
    //Para renderizar por primera vez
    useEffect(() => {
        api.get("/estudiantes")
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
        api.delete(`/estudiantes/${id}`)

            .then(() => {
                console.log("Estuidante eliminado", id)
                setEstudiantes(prev => prev.filter(e => getId(e) !== id))
            })
            .catch(err => console.log(err))
    }

    const editarEstudiante = (editadoEstudiante) => {
        const id = getId(editadoEstudiante)
        api.put(`/estudiantes/${id}`, editadoEstudiante)
            .then(res => setEstudiantes(prev =>
                prev.map(e => getId(e) === id ? res.data : e)
            ))
            .catch(err => console.log(err))
    }

    //logging
    const login = (estudianteLogin) => {
        return api.post("/estudiantes/login", estudianteLogin)
            .then(res =>{
            console.log(res.data.message);
            return res.data;
        })
        .catch(err => {
            const mensaje = err.response?.data?.message ?? "Error al iniciar sesión";
            console.log(mensaje);
            throw mensaje;
        })
    }
    return { estudiantes, agregarEstudiante, eliminarEstudiante, editarEstudiante, login };
}
