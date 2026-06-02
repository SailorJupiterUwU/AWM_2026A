const Taller =  (props) => {
    const {id, nombre, nivel, duracion} = props

    return(
        <div>
            <h1>{nombre}</h1>
            <h2>{nivel}</h2>
        </div>
    )

}
export default Taller