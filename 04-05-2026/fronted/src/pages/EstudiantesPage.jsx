import Estudiante from "../components/Estudiante";
const EstudiantesPage = () => {
    return (
        <div>
            <Estudiante nombre={"Anaela Pozo"} edad={21} url={"https://www.google.com"} />
            <Estudiante nombre={"Daniel Carrion"} edad={23} url={"https://www.google.com"} />
            <Estudiante nombre={"OwO"} edad={50} url={"https://www.google.com"} />
        </div>
    )
}
export default EstudiantesPage;