import Estudiante from "../components/Estudiante";
import { listaEstudiantes } from "../utils/data";
const EstudiantesPage = () => {
    return (
        <div>
            {/*
            <Estudiante nombre={"Anaela Pozo"} edad={21} url={"https://www.google.com"} />
            <Estudiante nombre={"Daniel Carrion"} edad={23} url={"https://www.google.com"} />
            <Estudiante nombre={"OwO"} edad={50} url={"https://www.google.com"} />*/}
            {
                listaEstudiantes.map((estudiante) => {
                    return <Estudiante nombre={estudiante.nombre} edad={estudiante.edad} url={estudiante.url}/>
                })
            }
        </div>
    )
}
export default EstudiantesPage;