const Curso = (props) => {
    const {id, nombre, nivel, duracion} = props;
    return(
        <div>
            <div> {id} {nombre} </div>
            <p>
                {nivel}
            </p>
            <div>
                {duracion} horas
            </div>
        </div>
    )
}
export default Curso