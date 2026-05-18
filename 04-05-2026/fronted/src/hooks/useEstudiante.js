import { useState, useEffect } from "react";
import { api } from "../utils/api"

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

    return { estudiantes, agregarEstudiante };
}
