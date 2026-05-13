import { useState, useEffect } from "react";
import Estudiante from "../components/Estudiante";
//import { listaEstudiantes } from "../utils/data"; porque se usa otro servidor como fuente de verdad
import EstudianteForm from "../components/EstudianteForm";
//biblioteca para acciones http
import axios from 'axios';


const EstudiantesPage = () => {
    //Variable de estado para la lista de estudiantes
    
    //1) Paso Estado Global [Lifting State UP]
    const [lstEstudiantes, setLstEstudiantes] = useState([]);
    
    useEffect(()=> {
        /*1. peticion http usando axios*/
        axios.get("http://172.31.45.10:8000/estudiantes")//Puede retornar fallido o exitoso, se gestiona con promesas
        /*2. manejo de una promesa (pendiente, resuelto o fallido son estados de una petición, por lo que se usa promesa)*/
            .then((res) => {
                console.log(res);
                setLstEstudiantes(res.data)
            }) //se ejecuta cuando es exitosa, cuando es exitoso es 200 de codigo de html
        .catch((err)=> console.log(err)) //se ejecuta cuando es fallido, codigo diferente de 200
        /*3. manejo de side-effects utilizando un hook useEffect (evita el rendeirizado infinito, se asegura que solo se ejecute una vez )*/ 
    } , [])//el vector de dependencIA VACIO PARA QUE SE EJECUTE UNA VEZ
    
    
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