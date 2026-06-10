import { useNavigate } from "react-router-dom"
import SitioTuristico from "../components/SitioTuristico.jsx"
import { navigate } from 'react'
import SitioForm from "../components/SitioForm.jsx"

const SitioTuristicoPage = (props) => {
    //Desectructuracion de la lista de sitios turisticas
    const { sitios, darLike } = props;
    

    //Para navegar
    const navegar = useNavigate()
    //Para ir al formulario
    const irFormulario = () =>{
        navegar("/sitio/new")
    }
    
    return (

        <div>
            <h1>Sitios Turisticos</h1>
            <hr />
            {
                sitios.map((sitioturistico) => {
                    return (
                        <div key={sitioturistico.id} className="card card--yellow">
                            <div className="imagen">
                                <img src="../imagenes/mundo.png" alt=" " />
                            </div>
                            <SitioTuristico nombre={sitioturistico.nombre} ciudad={sitioturistico.ciudad} pais={sitioturistico.pais} descripcion={sitioturistico.descripcion} likes={sitioturistico.likes}/>
                            <div>
                                <form onSubmit={darLike}>
                                    <input type="submit" value="Like" />
                                </form>
                            </div>
                        </div>
                    )
                }
                )
            }
            <form onSubmit={irFormulario}>
                <input type="submit" value="+"/>
            </form>

        </div>
    )

}
export default SitioTuristicoPage