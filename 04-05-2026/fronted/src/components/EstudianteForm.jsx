import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import { useParams } from "react-router-dom";

const EstudianteForm = (props) => {
    //Para navegar entre pagin
    const navegar = useNavigate();
    //Variable de estado para el nuevo estudiante
    const [nuevoEstudiante, setNuevoEstudiante] = useState({
        nombre: " ",
        edad: 0,
        url: " "
    });

    //Para hacer el formulario
    const { id } = useParams();

    useEffect(() => {
        if (editar) {
            api.get(`/estudiantes/${id}`)
                .then(res => setNuevoEstudiante(res.data))
                .catch(err => console.log(err))
        }
    }, [id]);

    const [errorNombre, setError] = useState("");
    const [errorEdad, setErrorEdad] = useState("");

    //Desestructuracion de la funcion de props
    const { onAgregar, onEditar } = props;

    //Para saber si esta editando o no
    const editar = !!id;

    const handlerSubmit = (e) => {
        e.preventDefault();
        //Para manejar el tamaño del texto
        if ((nuevoEstudiante.nombre.length >= 8) && (nuevoEstudiante.edad > 18)) {
            if (editar) {
                onEditar(nuevoEstudiante)
                setError("")
                setErrorEdad("")
                setNuevoEstudiante({ id: " ", nombre: " ", edad: 0, url: " " })
                navegar("/estudiantes")
            }
            else {
                onAgregar(nuevoEstudiante)
                setError("")
                setErrorEdad("")
                setNuevoEstudiante({ id: " ", nombre: " ", edad: 0, url: " " })
                navegar("/estudiantes")
            }
        }

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
        <form onSubmit={handlerSubmit}>
            <div>
                <label htmlFor="est_nombre">Nombre:</label>
                <input
                    type="text"
                    name="est_nombre"
                    id="est_nombre"
                    value={nuevoEstudiante.nombre}
                    onChange={(e) => setNuevoEstudiante({ ...nuevoEstudiante, nombre: e.target.value })}
                    placeholder="Ingresa nombre" required />
            </div>
            <div style={{ color: "red" }}>
                {errorNombre}
            </div>
            <div>
                <label htmlFor="est_edad">Edad:</label>
                <input
                    type="number"
                    name="est_edad"
                    id="est_edad" value={nuevoEstudiante.edad}
                    onChange={(e) => setNuevoEstudiante({ ...nuevoEstudiante, edad: e.target.value })}
                    placeholder="Ingresa tu edad" required />
            </div>
            <div style={{ color: "red" }}>
                {errorEdad}
            </div>
            <div>
                <label htmlFor="est_url">URL Home Page:</label>
                <input
                    type="text"
                    name="est_url"
                    id="est_url"
                    value={nuevoEstudiante.url}
                    onChange={(e) => setNuevoEstudiante({ ...nuevoEstudiante, url: e.target.value })}
                    placeholder="Ingresa URL Home Page" required />
            </div>
            <div>
                <input
                    type="submit"
                    value="Agregar"
                />
            </div>
        </form>
    )
}

export default EstudianteForm;