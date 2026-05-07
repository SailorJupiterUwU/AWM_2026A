import { useState } from "react";
import Estudiante from "../components/Estudiante";
import { listaEstudiantes } from "../utils/data";

const EstudiantesPage = () => {
    //Variable de estado para la lista de estudiantes
    const [lstEstudiantes, setLstEstudiantes] = useState(listaEstudiantes);
    //Variable de estado para el nuevo estudiante
    const [nuevoEstudiante, setNuevoEstudiante] = useState({
        id: Date.now(),
        nombre: " ",
        edad: 0,
        url: " "
    });
    const handleAgregarEstudiante = (e) => {
        e.preventDefault();
        setLstEstudiantes([...lstEstudiantes, nuevoEstudiante])
        setNuevoEstudiante({...nuevoEstudiante, nombre: null, edad:null, url:null})
    }
    return (
        <div>
            {/*
            <Estudiante nombre={"Anaela Pozo"} edad={21} url={"https://www.google.com"} />
            <Estudiante nombre={"Daniel Carrion"} edad={23} url={"https://www.google.com"} />
            <Estudiante nombre={"OwO"} edad={50} url={"https://www.google.com"} />*/}

            <h1>Estudiantes</h1>
            <hr/>
            <form onSubmit={handleAgregarEstudiante}>
                <div>
                    <label htmlFor="est_nombre">Nombre:</label>
                    <input
                        type="text"
                        name="est_nombre"
                        id="est_nombre"
                        value={nuevoEstudiante.nombre}
                        onChange={(e) => setNuevoEstudiante({ ...nuevoEstudiante, nombre: e.target.value })}
                        placeholder="Ingresa nombre" required />
                </div>
                <div>
                    <label htmlFor="est_edad">Edad:</label>
                    <input
                        type="number"
                        name="est_edad"
                        id="est_edad" value={nuevoEstudiante.edad}
                        onChange={(e) => setNuevoEstudiante({ ...nuevoEstudiante, edad: e.target.value })}
                        placeholder="Ingresa tu edad" required />
                </div>
                <div>
                    <label htmlFor="est_url">URL Home Page:</label>
                    <input
                        type="text"
                        name="est_url"
                        id="est_url"
                        value={nuevoEstudiante.url}
                        onChange={(e) => setNuevoEstudiante({ ...nuevoEstudiante, url: e.target.value })}
                        placeholder="Ingresa URL Home Page" required />
                </div>
                <div>
                    <input
                        type="submit"
                        value="Agregar"
                    />
                </div>
            </form>
            {
                lstEstudiantes.map((estudiante) => {
                    return <Estudiante key={estudiante.id} nombre={estudiante.nombre} edad={estudiante.edad} url={estudiante.url} />
                })
            }
        </div>
    )
}
export default EstudiantesPage;