import Taller from "../components/Taller";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const TallerPage = (props) => {
    const {talleres} = props
    const navegar = useNavigate()
    const id = useParams()
    return(
        <div>
            <h1>Talleres de Programacion</h1>
            <button onClick={()=>navegar("/crear")}>Crear Taller</button>
            <hr/>
            {
                talleres.map((taller)=>{
                    return(
                        <div key={taller.id}>
                            <Taller nombre={taller.nombre} nivel={taller.nivel}/>
                            <button onClick={()=>navegar(`/taller/${taller.id}`)}>
                                Ver Detalles
                            </button>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default TallerPage