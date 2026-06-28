import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const UserForm = (props) => {
    const { onAgregarUser } = props
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const navegar = useNavigate();

    //Objeto con el nuevo Estudiante
    const [nuevoUsuario, setNuevoUsuario] = useState({
        email: "",
        rol: "",
        password: ""
    });


    const handlerSubmit = (e) => {
        e.preventDefault();
        if (nuevoUsuario.password == confPassword)
            onAgregarUser(nuevoUsuario)
                .then(() => {
                    setConfPassword("")
                    navegar("/login")
                })
                .catch((mensajeClaro) => {
                    if (mensajeClaro.toLowerCase().includes("existe") || mensajeClaro.toLowerCase().includes("email")) {
                        setErrorEmail(mensajeClaro);
                    } else {
                        setErrorPassword(mensajeClaro);
                    }
                });
        else {
            setConfPassword("Las contraseñas deben ser iguales")
        }
    }

    return (
        <div>
            <h1>
                Registrar Usuario
            </h1>
            <button onClick={() => navegar("/login")}>←</button>
            <hr />
            <form onSubmit={handlerSubmit}>
                <div>
                    <label htmlFor="userEmail">Email</label>
                    <input
                        type="email"
                        name="userEmail"
                        id="userEmail"
                        value={nuevoUsuario.email}
                        onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })}
                        placeholder="Ingresa tu email" required
                    />
                </div>
                <div style={{ color: "red" }}>
                    {errorEmail}
                </div>
                <div>
                    <label htmlFor="userRol">Rol</label>
                    <select name="userRol"
                        id="userRol"
                        value={nuevoUsuario.rol}
                        onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })}>
                        <option value="Admin">Admin OwO</option>
                        <option value="Visualizador">Visualizador UwU</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="userPass">Contraseña</label>
                    <input
                        type="password"
                        name="userPass"
                        id="userPass"
                        value={nuevoUsuario.password}
                        onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })}
                        placeholder="Ingresa tu password" required
                    />
                </div>
                <div>
                    <label htmlFor="confContra">Confirmar Contraseña</label>
                    <input
                        type="password"
                        name="confContra"
                        id="confContra"
                        onChange={(e) => setConfPassword(e.target.value)}
                        placeholder="Confirma tu password" required
                    />
                </div>
                <div style={{ color: "red" }}>
                    {errorPassword}
                </div>
                <div>
                    <input type="submit" value="Registrar" />
                </div>
            </form>
        </div>
    )
}

export default UserForm;