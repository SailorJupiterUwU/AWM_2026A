import { useState } from "react";
import Estudiante from "../components/Estudiante";
import { listaEstudiantes } from "../utils/data";
import EstudianteForm from "../components/EstudianteForm";

const EstudiantesPage = () => {
    //Variable de estado para la lista de estudiantes
    
    //1) Paso Estado Global [Lifting State UP]
    const [lstEstudiantes, setLstEstudiantes] = useState(listaEstudiantes);
    
    console.log("Renderizando...");
       /*const handleAgregarEstudiante = (e) => {
        e.preventDefault();
        //Temporal el id se construye a partir de la fecha del sistema, hasta que se conecte a la bdd
        const estudianteFinal = {...nuevoEstudiante, id: Date.now()}
        setLstEstudiantes([...lstEstudiantes, estudianteFinal])
        setNuevoEstudiante({...nuevoEstudiante, nombre: null, edad:null, url:null})
    }*/

    //2) Funcion para actualizar el estado global
    const agregarEstudiante = (nuevoEstudiante) => {
        //Temporal el id se construye a partir de la fecha del sistema, hasta que se conecte a la bdd
        const estudianteFinal = {...nuevoEstudiante, id: Date.now()}
        //setLstEstudiantes([...lstEstudiantes, estudianteFinal])
        setLstEstudiantes(prev => [...prev, estudianteFinal])
    }
 
    return (
        <div>
            {/*
            <Estudiante nombre={"Anaela Pozo"} edad={21} url={"https://www.google.com"} />
            <Estudiante nombre={"Daniel Carrion"} edad={23} url={"https://www.google.com"} />
            <Estudiante nombre={"OwO"} edad={50} url={"https://www.google.com"} />*/}

            <h1>Estudiantes</h1>
            <hr />
            <EstudianteForm onAgregar={agregarEstudiante}/>
            <hr />
            {
                lstEstudiantes.map((estudiante) => {
                    return <Estudiante key={estudiante.id} nombre={estudiante.nombre} edad={estudiante.edad} url={estudiante.url} />
                })
            }
        </div>
    )
}
export default EstudiantesPage;