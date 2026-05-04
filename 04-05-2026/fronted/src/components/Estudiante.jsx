const Estudiante = (props) => {
    //nombre={xxxx} edad={00} url={https://xxxx}
    console.log(props)
    const {nombre, edad, url} = props;
    return (
        <div>
            <h1>{nombre}</h1>
            <h2>{edad}</h2>
            <a href={url}>Home Page</a>
        </div>
    )
}
export default Estudiante;