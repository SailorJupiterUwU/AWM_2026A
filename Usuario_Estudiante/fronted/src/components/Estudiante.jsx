//Para mostrar a un solo estudiante en toda la lista

const Estudiante = (props) => {
    const {nombre, edad, url} = props

    return(
        <div>
            <h2>{nombre}</h2>
            <h3>{edad}</h3>
            <h3>{url? <a  href={url}>Home Page</a> : <span>No disponible</span>}</h3>
        </div>
    )
}

export default Estudiante;