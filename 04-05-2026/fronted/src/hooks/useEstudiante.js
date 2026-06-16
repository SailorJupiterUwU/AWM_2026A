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

        api.post("/estudiantes", nuevoEstudiante)
            .then((res) => {
                setEstudiantes(prev => ([...prev, res.data]))
            })
            .catch((err) => console.log(err))

    }

    const eliminarEstudiante = (id) => {
        api.delete(`/estudiantes/${id}`)

            .then(() => {
                console.log("Estuidante eliminado", id)
                setEstudiantes(prev=> prev.filter(e => getId(e) !== id))})
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
    return { estudiantes, agregarEstudiante, eliminarEstudiante, editarEstudiante };
}
