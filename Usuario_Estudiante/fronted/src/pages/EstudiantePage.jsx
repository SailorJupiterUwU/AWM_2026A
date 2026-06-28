import { useNavigate } from "react-router-dom";
import Estudiante from "../components/Estudiante";
import { getId } from "../utils/normalizador";
import { useState, useEffect } from "react";
import { useRol } from "../hooks/useRol";



const EstudiantePage = (props) => {
    //Se trae la lista de estudiantesw
    const { estudiantes, onEliminar } = props;
    const [listaEstudiantes, setListaEstudiantes] = useState([]);

    //Para usar la funcion
    const navegar = useNavigate()

    const { esVisualizador } = useRol()

    const botonDeshabilitado = {
        disabled: esVisualizador,
        style: {
            opacity: esVisualizador ? 0.5 : 1,
            cursor: esVisualizador ? "not-allowed" : "pointer",
        },
    };

    useEffect(() => {
        if (estudiantes) {
            setListaEstudiantes(estudiantes);
        }
    }, [estudiantes]);

    const cerrarSesion = () => {
        sessionStorage.removeItem('rol')
        sessionStorage.removeItem('token')
        navegar("/");
    }

    return (
        <div>
            <button onClick={cerrarSesion}>Cerrar Sesion</button>
            <h1>Estudiantes</h1>
            <button onClick={() => navegar("/estudiantes/nuevo")}
                {...botonDeshabilitado}>+</button>
            <hr />
            {
                listaEstudiantes.map((estudiante) => {
                    const id = getId(estudiante)
                    return (<div key={id}> <Estudiante nombre={estudiante.nombre} edad={estudiante.edad} url={estudiante.url} />
                        <button onClick={() => navegar(`/estudiantes/${id}/detalle`)}>Detalle</button>
                        <span>   </span>
                        <button onClick={() => onEliminar(id)}
                            {...botonDeshabilitado}>Eliminar</button>
                        <h3>--------------------------------------------------------------------------</h3>
                    </div>
                    )
                })
            }
        </div>
    )
}
export default EstudiantePage;