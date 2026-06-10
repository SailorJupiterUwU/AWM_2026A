import { useNavigate } from "react-router-dom";
import { useState } from "react";


const SitioForm = (props) => {
    //Para navegar
    const navegar = useNavigate();

    //variable para el nuevo sitioturistico
    const [nuevoSitio, setNuevoSitio] = useState({
        nombre: " ",
        ciudad: " ",
        pais: " ",
        likes: 0,
    });

    //Para detectar errores
    const [errorID, setErrorID] = useState("")
    const [errorNombreS, setErrorNombreS] = useState("")
    const [errorDescripcion, setErrorDescripcion] = useState(" ")
    const [errorCiudad, setErrorCiudad] = useState(" ")
    const [errorPais, setErrorPais] = useState("")

    //Funcion desesctructurada para agregar 
    const { onAgregar } = props;

    //Para enviar
    const handlerSubmit = (e) => {
        e.preventDefault();
        //Para evitar campos en blanco
        if (nuevoSitio.id >= 0 && nuevoSitio.nombre.length >= 8 && nuevoSitio.ciudad.length >= 8 && nuevoSitio.pais.length >= 8 && nuevoSitio.descripcion.length >= 8) {
            onAgregar(nuevoSitio)
            setErrorCiudad("")
            setErrorID("")
            setErrorNombreS("")
            setErrorPais("")
            setErrorDescripcion("")
            setNuevoSitio({
                id:0,
                nombre: " ",
                ciudad: " ",
                pais: " ",
                likes: 0,
            })
            navegar("/sitio")
        }
        if(nuevoSitio.id <=0)
            setErrorID("El ID debe ser mayor a 0")
        if(nuevoSitio.nombre.length <8)
            setErrorNombreS("El Nombre debe tener al meno s8 caracteres")
        if(nuevoSitio.ciudad.length < 8)
            setErrorCiudad("La Ciudad debe tener al menos 8 carcateres")
        if(nuevoSitio.pais.length <8)
            setErrorPais("El Pais debe tener al menos 8 caracteres")
        if(nuevoSitio.descripcion <8)
            setErrorDescripcion("El Pais debe tener al menos 8 caractere")
    }


    return (
        <form onSubmit={handlerSubmit}>
            <div>
                <label htmlFor="lblID">ID</label>
                <input
                    type="number"
                    name="lblID"
                    id="lblID"
                    placeholder="id"
                    onChange={(e) => setNuevoSitio({ ...nuevoSitio, id: e.target.value })}
                    required />
            </div>
            <div>
                {errorID}
            </div>
            <div>
                <label htmlFor="lblNombre">Nombre</label>
                <input
                    type="text"
                    name="lblNombre"
                    id="lblNombre"
                    placehorlder="Nombre"
                    onChange={(e) => setNuevoSitio({ ...nuevoSitio, nombre: e.target.value })}
                    required />
            </div>
            <div>
                {errorNombreS}
            </div>
            <div>
                <label htmlFor="lblCiudad">Ciudad</label>
                <input
                    type="text"
                    name="lblCiudad"
                    id="lblCiudad"
                    placeholder="Ciudad"
                    onChange={(e) => setNuevoSitio({ ...nuevoSitio, ciudad: e.target.value })}
                    required />
            </div>
            <div>
                {errorCiudad}
            </div>
            <div>
                <label htmlFor="lblPais">Pais</label>
                <input
                    type="text"
                    name="lblPais"
                    id="lblPais"
                    placeholder="Pais"
                    onChange={(e) => setNuevoSitio({ ...nuevoSitio, pais: e.target.value })}
                    required />
            </div>
            <div>
                {errorPais}
            </div>
            <div>
                <label htmlFor="lblDescripcion">Descripcion</label>
                <input
                    type="text"
                    name="lblDescripcion"
                    id="lblDescripcion"
                    placeholder="Descripcion"
                    onChange={(e) => setNuevoSitio({ ...nuevoSitio, descripcion: e.target.value })}
                    required />
            </div>
            <div>
                {errorDescripcion}
            </div>
            <div>
                <input type="submit" value="Agregar" />
            </div>
        </form>
    )
}
export default SitioForm