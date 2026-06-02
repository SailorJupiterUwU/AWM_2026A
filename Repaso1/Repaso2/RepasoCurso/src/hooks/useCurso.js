import { useState } from "react"
import { lstCursos } from "../utils/data"

const useCurso = () => {
    const [cursos, setCursos] = useState([])
    const agregarCurso = (nuevoCurso) =>{
        setCursos(...cursos, nuevoCurso)
    }
    return {cursos, agregarCurso}
}
export default useCurso