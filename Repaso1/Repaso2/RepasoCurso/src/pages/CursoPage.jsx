import Curso from "../components/Curso";
import { useNavigate } from 'react-router-dom'

const CursosPage = (props) => {
    const { cursos } = props;
    const navegar = useNavigate()

    return (
        <div>
            <h1>Lista de Cursos</h1>
            <hr />
            {
                cursos.map((cursos) => {
                    return (
                        <div key={cursos.id}>
                            <Curso
                                id={cursos.id}
                                nombre={cursos.nombre}
                                duracion={cursos.duracion}
                                nivel={cursos.nivel} />
                                <button>
                                    Eliminar
                                </button>
                        </div>
                    )
                })
            }
            <button onClick={navegar('/crear')}>
                Agregar
            </button>

        </div>
    )
}