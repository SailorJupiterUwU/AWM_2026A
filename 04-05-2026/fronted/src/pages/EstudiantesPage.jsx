import { useNavigate } from "react-router-dom";
import Estudiante from "../components/Estudiante";
import EstudianteForm from "../components/EstudianteForm";

const EstudiantesPage = (props) => {

    //Se trae la lista de estudiantesw
    const { estudiantes } = props;

    //Para usar la funcion

    console.log("Renderizando...");
    const navegar = useNavigate()

    return (
        <div>
            <h1>Estudiantes</h1>
            <hr />
            <hr />
            {
                estudiantes.map((estudiante) => {
                    return (<div key={estudiante.id}> <Estudiante  nombre={estudiante.nombre} edad={estudiante.edad} url={estudiante.url} /> 
                        <button onClick={() => navegar(`/estudiantes/${estudiante.id}/detalle`) }>Detalle</button>
                        <button>Eliminar</button>
                        </div>
                    )
                    })
            }
        </div>
    )
}
export default EstudiantesPage;