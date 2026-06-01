import { useNavigate } from "react-router-dom";

const DetalleTaller = (props) => {
    const {taller} = props
    const navegar = useNavigate()
    return(
        <div>
            <button onClick={()=>navegar("/talleres")}>
                Volver
            </button>
            <h1>{taller.nombre}</h1>
            <h2>Nivel: {taller.nivel}</h2>
            <h2>Duracion: {taller.duracion} horas</h2>
        </div>
    )
}
export default DetalleTaller