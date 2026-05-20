//a este componente lo visitamos a través del path /estudiante/:id/detalle
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../utils/api";

const DetalleEstudiante = () => {
    const [estudiante, setEstudiante] = useState({});
    const { id } = useParams();

    useEffect(() => {
        api.get(`/estudiantes/${id}`)
            .then(res => setEstudiante(res.data))
            .catch(err => console.log(err))
    }, []);

    return(
        <div>
            <h2>{estudiante.nombre}</h2>
            <h4>Edad: {estudiante.edad}</h4>
            {estudiante.url?<a href={estudiante.url}>Home Page</a>:<span>Home page no disponible</span>}
        </div>
    )
}
export default DetalleEstudiante