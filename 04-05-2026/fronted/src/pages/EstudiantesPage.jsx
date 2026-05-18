import Estudiante from "../components/Estudiante";
import EstudianteForm from "../components/EstudianteForm";

const EstudiantesPage = (props) => {

    //Se trae la lista de estudiantesw
    const { estudiantes } = props;

    //Para usar la funcion

    console.log("Renderizando...");

    return (
        <div>
            <h1>Estudiantes</h1>
            <hr />
            <hr />
            {
                estudiantes.map((estudiante) => {
                    return <Estudiante key={estudiante.id} nombre={estudiante.nombre} edad={estudiante.edad} url={estudiante.url} />
                })
            }
        </div>
    )
}
export default EstudiantesPage;