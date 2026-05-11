import { useState } from "react";


const EstudianteForm = (props) => {
    //Variable de estado para el nuevo estudiante
    const [nuevoEstudiante, setNuevoEstudiante] = useState({
        id: " ",
        nombre: " ",
        edad: 0,
        url: " "
    });
    const [errorNombre, setError] = useState(" ");
    const [errorEdad, setErrorEdad] = useState(" ");
    
    //Desestructuracion de la funcion de props
    const { onAgregar } = props;

    const handlerSubmit = (e) => {
        e.preventDefault();
        //Para manejar el tamaño del texto
        if ((nuevoEstudiante.nombre.lenght >= 8) && (nuevoEstudiante.edad > 18)) {
            onAgregar(nuevoEstudiante)
            setError(" ")
            setErrorEdad(" ")
        }else{
            if(nuevoEstudiante.nombre.lenght <= 7){
                setError("El nombre debe tener 8 caracteres minimo")
            }
            if(nuevoEstudiante.edad < 18){
                setErrorEdad("La edad debe ser mayor a 18")
            }
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
            <div>
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
            <div>
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