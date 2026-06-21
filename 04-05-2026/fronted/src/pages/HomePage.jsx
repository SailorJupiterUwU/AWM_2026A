import { Link } from "react-router-dom"

const HomePage = () => {
    return (
        <div>
            <h1>Bienvenido</h1>
            <div>
                <Link to="/login">Inicio de Sesion</Link>
            </div>
            <div>
                <Link to="/estudiantes/nuevo">Registro</Link>
            </div>
        </div>);
}
export default HomePage;