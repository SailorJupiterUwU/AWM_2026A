import { useNavigate } from "react-router-dom";
import Estudiante from "../components/Estudiante";
import EstudianteForm from "../components/EstudianteForm";
import { getId } from "../utils/normalizador";

const EstudiantesPage = (props) => {

    
    //Se trae la lista de estudiantesw
    const { estudiantes, onEliminar } = props;

    //Para usar la funcion
    console.log("Renderizando...");
    const navegar = useNavigate()

    return (
        <div>
            <h1>Estudiantes</h1>
            <br />
            <hr />
            {
                estudiantes.map((estudiante) => {
                    const id = getId(estudiante)
                    return (<div key={id}> <Estudiante nombre={estudiante.nombre} edad={estudiante.edad} url={estudiante.url} />
                        <button onClick={() => navegar(`/estudiantes/${id}/detalle`)}>Detalle</button>
                        <button onClick={() => onEliminar(id)}>Eliminar</button>
                    </div>
                    )
                })
            }
        </div>
    )
}
export default EstudiantesPage;