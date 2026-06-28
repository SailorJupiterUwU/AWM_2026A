import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRol } from "../hooks/useRol";

const EstudianteForm = (props) => {
    //Recibir funciones de props
    const { onAgregar, onEditar, onGetEstudiante } = props;

    const { esVisualizador } = useRol()

    //Para navegar entre pagin
    const navegar = useNavigate();

    /* Para cuando se edite un Estudiante */
    const { id } = useParams();
    const editar = !!id;

    //Setear Errores
    const [errorNombre, setError] = useState("");
    const [errorEdad, setErrorEdad] = useState("");

    //Objeto con el nuevo Estudiante
    const [nuevoEstudiante, setNuevoEstudiante] = useState({
        nombre: "",
        edad: 0,
        url: ""
    });

    //Para cargar los datos del estudiante
    useEffect(() => {
        if (editar) {
            onGetEstudiante(id)
                .then(res => setNuevoEstudiante({ ...res.data }))
        }
    }, [id]);

    //Funcion para enviar el formulario
    const handlerSubmit = (e) => {
        e.preventDefault();
        if ((nuevoEstudiante.nombre.length >= 8) && (nuevoEstudiante.edad > 18)) {
            if (editar) {
                onEditar(nuevoEstudiante)
                    .then(() => {
                        setError("")
                        setErrorEdad("")
                        setNuevoEstudiante({ id: "", nombre: "", edad: 0, url: "" })
                        navegar("/estudiantes")
                    })
                    .catch((mensaje) => setError(mensaje));
            }
            else {
                onAgregar(nuevoEstudiante)
                    .then(() => {
                        setError("")
                        setErrorEdad("")
                        setNuevoEstudiante({ id: "", nombre: "", edad: 0, url: "" })
                        navegar("/estudiantes")
                    })
                    .catch((mensaje) => setError(mensaje));
            }
        }
        //Para hacer las validaciones
        if (nuevoEstudiante.nombre.length <= 7) {
            setError("El nombre debe tener 8 caracteres minimo")
        } else {
            setError("")
        }
        if (nuevoEstudiante.edad < 18) {
            setErrorEdad("La edad debe ser mayor a 18")
        } else {
            setErrorEdad("")
        }

    }
    return (
        <div>
            <h1>
                {editar ? "Editar Estudiante" : "Registrar Estudiante"}
            </h1>
            <button onClick={() => navegar(editar ? `/estudiantes/${id}/detalle` : "/estudiantes")}>←</button>
            <hr />
            <form onSubmit={handlerSubmit}>
                <div>
                    <label htmlFor="estNombre">Nombre:</label>
                    <input
                        type="text"
                        name="estNombre"
                        id="estNombre"
                        value={nuevoEstudiante.nombre}
                        onChange={(e) => setNuevoEstudiante({ ...nuevoEstudiante, nombre: e.target.value })}
                        placeholder="Ingresa nombre" required />
                </div>
                <div style={{ color: "red" }}>
                    {errorNombre}
                </div>
                <div>
                    <label htmlFor="estEdad">Edad:</label>
                    <input
                        type="number"
                        name="estEdad"
                        id="estEdad" value={nuevoEstudiante.edad}
                        onChange={(e) => setNuevoEstudiante({ ...nuevoEstudiante, edad: e.target.value })}
                        placeholder="Ingresa tu edad" required />
                </div>

                <div style={{ color: "red" }}>
                    {errorEdad}
                </div>

                <div>
                    <label htmlFor="estUrl">URL Home Page:</label>
                    <input
                        type="text"
                        name="estUrl"
                        id="estUrl"
                        value={nuevoEstudiante.url}
                        onChange={(e) => setNuevoEstudiante({ ...nuevoEstudiante, url: e.target.value })}
                        placeholder="Ingresa URL Home Page" />
                </div>
                <div>
                    <input type="submit" value="Registrar" disabled={esVisualizador}
                        style={{ opacity: esVisualizador ? 0.5 : 1 }} />
                </div>
            </form>
        </div>
    )
}

export default EstudianteForm;