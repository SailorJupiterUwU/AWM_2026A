import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const LoginForm = (props) => {
    const { onLogin } = props
    const [errorEmail, setErrorEmail] = useState("");
    const navegar = useNavigate();
    const [iniciarUser, setIniciarUser] = useState({
        email: "",
        password: ""
    });
    const handlerSubmit = (e) => {
        e.preventDefault();
        if (iniciarUser.email.length > 8) {
            onLogin(iniciarUser)
                .then(() => {
                    navegar("/estudiantes");
                })
                .catch((mensaje) => {
                    setErrorEmail(mensaje);
                });
        }
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
                        value={iniciarUser.email}
                        onChange={(e) => setIniciarUser({ ...iniciarUser, email: e.target.value })}
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
                        value={iniciarUser.password}
                        onChange={(e) => setIniciarUser({ ...iniciarUser, password: e.target.value })}
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