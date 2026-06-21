import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const LoginForm = (props) => {
    const { onLogin } = props
    const [errorEmail, setErrorEmail] = useState("");
    const navegar = useNavigate();
    const [iniciarEstudiante, setIniciarEstudiante] = useState({
        email: " ",
        password: " "
    });
    const handlerSubmit = (e) => {
        e.preventDefault();
        if (iniciarEstudiante.email.length > 8) {
            onLogin(iniciarEstudiante)
                .then(() => navegar("/estudiantes"))
                .catch((mensaje) => setErrorEmail(mensaje));
        }
    }
    const handlerIrARegistro = () => {
        navegar("/estudiantes/nuevo");
    }
    return (
        <div>
            <h1>
                Inicio de Sesión
            </h1>
            <button onClick={() => navegar("/")}>←</button>
            <hr />
            <form onSubmit={handlerSubmit}>
                <div>
                    <label htmlFor="est_email">Email</label>
                    <input
                        type="text"
                        name="est_email"
                        id="est_email"
                        value={iniciarEstudiante.email}
                        onChange={(e) => setIniciarEstudiante({ ...iniciarEstudiante, email: e.target.value })}
                        placeholder="Ingresa tu email" required
                    />
                </div>
                <div style={{ color: "red" }}>
                    {errorEmail}
                </div>
                <div>
                    <label htmlFor="est_pass">Contraseña</label>
                    <input
                        type="password"
                        name="est_pass"
                        id="est_pass"
                        value={iniciarEstudiante.password}
                        onChange={(e) => setIniciarEstudiante({ ...iniciarEstudiante, password: e.target.value })}
                        placeholder="Ingresa tu password" required
                    />
                </div>
                <div>
                    <input
                        type="submit"
                        value="Iniciar Sesión"
                    />
                </div>
            </form>
        </div>
    )
}
export default LoginForm