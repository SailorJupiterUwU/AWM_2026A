import { useState } from "react"
import { useNavigate } from "react-router-dom";

const TallerForm = (props) => {
    const [nuevoTaller, setNuevoTaller] = useState({
        id: 0,
        nombre: "",
        nivel: " ",
        duracion: 0
    })
    const { onAgregar } = props
    const navegar = useNavigate()

    const [errorID, setErrorID] = useState()
    const [errorNombre, setErrorNombre] = useState()
    const [errorNivel, setErrorNivel] = useState()
    const [errorDuracion, setErrorDuracion] = useState()

    const handlerSubmi = (e) => {
        e.preventDefault();
        if (nuevoTaller.id > 0 && nuevoTaller.nombre.length > 5 && nuevoTaller.duracion > 5 && nuevoTaller.duracion < 100) {
            onAgregar(nuevoTaller)
            setNuevoTaller({
                id: 0,
                nombre: "",
                nivel: " ",
                duracion: 0
            })
            navegar("/talleres")
        }
        if (nuevoTaller.id < 0)
            setErrorID("Id debe ser mayor a 0")
        if (nuevoTaller.nombre.length < 5)
            setErrorNombre("Nombre debe tener el menos 5 caracteres")
        if (nuevoTaller.nivel < 2)
            setErrorNivel("Debe selecciona un nivel")
        if (nuevoTaller.duracion < 5 || nuevoTaller.duracion > 100)
            setErrorDuracion("El numero de horas debe ser correcto con el curso")
    }
    return (
        <div>
            <button onClick={() => navegar("/talleres")}>Volver</button>
            <form onSubmit={handlerSubmit}>
                <div>
                    <label htmlFor="nuevoID">ID</label>
                    <input
                        type="number"
                        name="nuevoID"
                        id="nuevoID"
                        value={nuevoTaller.id}
                        onChange={(e) => setNuevoTaller({ ...nuevoTaller, id: e.target.value })}
                        placeholder="Ingrea ID"
                        required />
                </div>
                <div>
                    {errorID}
                </div>
                <div>
                    <label htmlFor="nuevoNombre">Nombre</label>
                    <input
                        type="text"
                        name="nuevoNombre"
                        id="nuevoNombre"
                        value={nuevoTaller.nombre}
                        onChange={(e) => setNuevoTaller({ ...nuevoTaller, nombre: e.target.value })}
                        placeholder="Ingrea tu Nombre"
                        required />
                </div>
                <div>
                    {errorNombre}
                </div>
                <div>
                    <label htmlFor="nuevoNivel">Nivel</label>
                    <select
                        name="nuevoNivel"
                        id="nuevoNivel"
                        value={nuevoTaller.nivel}
                        onChange={(e) => setNuevoTaller({ ...nuevoTaller, nivel: e.target.value })}
                        placeholder="Ingrea el Nivel"
                        required
                    >
                        <option value="Basico">Basico</option>
                        <option value="Intermedio">Intermedio</option>
                        <option value="Avanzado">Avanzado</option>
                    </select>
                </div>
                <div>
                    {errorNivel}
                </div>
                <div>
                    <label htmlFor="nuevoDuracion">Duracion horas</label>
                    <input
                        type="number"
                        name="nuevoDuracion"
                        id="nuevoDuracion"
                        value={nuevoTaller.duracion}
                        onChange={(e) => setNuevoTaller({ ...nuevoTaller, duracion: e.target.value })}
                        placeholder="Ingrea ID"
                        required />
                </div>
                <div>
                    {errorDuracion}
                </div>
                <input type="submit" value="Guardar" />

            </form>
        </div>
    )

}
export default TallerForm