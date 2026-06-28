import { useState, useEffect } from "react";
import { api } from "../utils/api"
import { getId } from "../utils/normalizador";

//Gestionar el estado y las conexiones a la API que afecta al estado
export const useEstudiante = () => {
    //Variable de estado
    const [estudiantes, setEstudiantes] = useState([]);
    const [esVisualizador, setEsVisualizador] = useState(false);
    //Para renderizar por primera vez
    useEffect(() => {
        const rol = sessionStorage.getItem('rol');
        if (rol && rol.trim().toLowerCase() === "visualizador") {
            setEsVisualizador(true);
        } else {
            setEsVisualizador(false);
        }
        
        const token = sessionStorage.getItem('token')
        if (!token) {
            console.log("no hay token")
            return
        }
        api.get("/api/estudiantes", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setEstudiantes(res.data)
            })
            .catch((err) => {
                const mensaje = err.response?.data?.message ?? "Error al cargar estudiantes";
                throw mensaje;
            })
    }, [])

    //Para agregar nuevo estudiante
    const agregarEstudiante = (nuevoEstudiante) => {
        const token = sessionStorage.getItem('token')
        if (!token) {
            console.log("no hay token")
            return
        }
        return api.post("/api/estudiantes", nuevoEstudiante, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setEstudiantes(prev => ([...prev, res.data]))
            })
            .catch((err) => {
                const mensaje = err.response?.data?.message ?? "Error al registrar";
                throw mensaje;
            })

    }

    const eliminarEstudiante = (id) => {
        const token = sessionStorage.getItem('token')
        if (!token) {
            console.log("no hay token")
            return
        }
        api.delete(`/api/estudiantes/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

            .then(() => {
                console.log("Estuidante eliminado", id)
                setEstudiantes(prev => prev.filter(e => getId(e) !== id))
            })
            .catch(err => {
                const mensaje = err.response?.data?.message ?? "Error al eliminar estudiante";
                throw mensaje;
            })
    }

    const editarEstudiante = (editadoEstudiante) => {
        const id = getId(editadoEstudiante)
        const token = sessionStorage.getItem('token')
        if (!token) {
            return
        }
        return api.put(`/api/estudiantes/${id}`, editadoEstudiante, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => setEstudiantes(prev =>
                prev.map(e => getId(e) === id ? res.data : e)
            ))
            .catch((err) => {
                const mensaje = err.response?.data?.message ?? "Error al editar el estudiante";
                throw mensaje;
            })
    }

    const getEstudiante = (id) => {
        const token = sessionStorage.getItem('token')
        if (!token) {
            console.log("no hay token")
            return
        }
        return api.get(`/api/estudiantes/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res)
            .catch((err) => {
                const mensaje = err.response?.data?.message ?? "Error al obtener los datos del estudiante";
                throw mensaje;
            })
    }
    return { estudiantes, esVisualizador, agregarEstudiante, eliminarEstudiante, editarEstudiante, getEstudiante };
}
