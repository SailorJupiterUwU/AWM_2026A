import { useState } from "react";

const CursoForm = (props) => {
    const { onAgregar } = props;
    const [nuevoCurso, setNuevoCurso] = useState({
        id: 0,
        nombre: " ",
        nivel: "",
        duracion: 0
    });
    //valicadiones
    const handlerSubmit = () => {
        const [errorNombre, setErrorNombre] = useState("")
        const [errorDuracion, setErrorDuracion] = useState("")
        const navegar = useNavigate()
        const handlerSubmit = (e) => {
            e.preventDefault();
            if ((nuevoCurso.nombre.length >= 5) && nuevoCurso.duracion<=100 && nuevoCurso.duracion>=10) {
                onAgregar(nuevoCurso)
                setErrorNombre("")
                setErrorDuracion("")
                setNuevoCurso({ nombre: "", nivel: "", duracion: 0 })
                navegar("/cursos")
            }
            else {
                setErrorNombre("Pusiste mal el nombre debe contener 5 letras minimos")
                setErrorDuracion("La duracion debe ser entre 10 y 100 horas")
            }
            if (nuevoCurso.nombre.length <= 4) {
                setErrorNombre("Pusiste mal el nombre debe contener 5 letras minimos")
            }
            if (nuevoCurso.duracion>100 && nuevoCurso.duracion<10) {
                setErrorDuracion("La duracion debe ser entre 10 y 100 horas")
            }
        }
    }

    return (
        <div>
            <h1>Agregar Curso</h1>
            <form onSubmit={handlerSubmit}>
                <div>
                    <label htmlFor="idCurso">ID</label>
                    <input type="number" id="idCurso" name="idCurso" onChange={(e) => setNuevoCurso({ ...nuevoCurso, id: e.target.value })} required />
                </div>
                <div>
                    <label htmlFor="nombreCurso">Nombre</label>
                    <input type="text" id="nombreCurso" name="nombreCurso" onChange={(e) => setNuevoCurso({ ...nuevoCurso, nombre: e.target.value })} required />
                </div>
                <div>
                    <label htmlFor="nombreDuracion">Duracion</label>
                    <input type="number" id="nombreDuracion" name="nombreDuracion" onChange={(e) => setNuevoCurso({ ...nuevoCurso, duracion: e.target.value })} required />
                </div>
                <div>
                    <label htmlFor="nivelCurso">Nivel</label>
                    <select name="nivelCurso" id="nivelCurso" onChange={(e) => setNuevoCurso({ ...nuevoCurso, nivel: e.target.value })} required>
                        <option value="Basico">Basico</option>
                        <option value="Intermedio">Intermedio</option>
                        <option value="Avanzado">Avanzado</option>
                    </select>
                </div>
            </form>
        </div>
    )
}
export default CursoForm