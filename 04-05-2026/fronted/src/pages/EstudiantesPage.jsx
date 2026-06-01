import { useNavigate } from "react-router-dom";
import Estudiante from "../components/Estudiante";
import EstudianteForm from "../components/EstudianteForm";

const EstudiantesPage = (props) => {

    //Se trae la lista de estudiantesw
    const { estudiantes, onEliminar } = props;

    //Para usar la funcion
    console.log("Renderizando...");
    const navegar = useNavigate()

    return (
        <div>
            <h1>Estudiantes</h1>
            <button onClick={() => navegar("/estudiantes/nuevo")}>+</button>
            <hr />
            {
                estudiantes.map((estudiante) => {
                    return (<div key={estudiante.id}> <Estudiante nombre={estudiante.nombre} edad={estudiante.edad} url={estudiante.url} />
                        <button onClick={() => navegar(`/estudiantes/${estudiante.id}/detalle`)}>Detalle</button>
                        <button onClick={() => onEliminar(estudiante.id)}>Eliminar</button>
                    </div>
                    )
                })
            }
        </div>
    )
}
export default EstudiantesPage;