import { Link } from "react-router-dom"

const HomePage = () => {
    return (
        <div>
            <h1>Bienvenido</h1>
            <div>
                <Link to="/estudiantes">Lista de Estudiantes</Link>
            </div>
            <div>
                <Link to="/estudiantes/nuevo">Agregar nuevo Estudiante</Link>
            </div>
        </div>);
}
export default HomePage;