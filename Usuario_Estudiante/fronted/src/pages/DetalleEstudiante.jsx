//a este componente lo visitamos a través del path /estudiante/:id/detalle
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRol } from "../hooks/useRol";

const DetalleEstudiante = (props) => {
    const [estudiante, setEstudiante] = useState({});
    const { id } = useParams();
    const navegar = useNavigate();
    const { onGetEstudiante } = props
    const [errorBuscarEstudiante, setErrorBuscarEstudiante] = useState("");
    const { esVisualizador } = useRol()

    useEffect(() => {
        onGetEstudiante(id)
            .then(res => {
                setErrorBuscarEstudiante("")
                setEstudiante({ ...res.data })
            })
            .catch((error) => {
                setErrorBuscarEstudiante(error)
            })
    }, []);

    return (
        <div>
            <h1>Detalle</h1>
            <button onClick={() => navegar("/estudiantes")}>←</button>
            <hr />
            <h2 style={{ color: "red" }}>{errorBuscarEstudiante}</h2>
            <h2>{estudiante.nombre}</h2>
            <h4>Edad: {estudiante.edad}</h4>
            {estudiante.url ? <a href={estudiante.url}>Home Page</a> : <span>Home page no disponible</span>}
            <br />
            <button onClick={() => navegar(`/estudiantes/${id}/editar`)}
                disabled={esVisualizador}
                style={{ opacity: esVisualizador ? 0.5 : 1 }}>Editar UwU</button>
        </div>
    )
}
export default DetalleEstudiante