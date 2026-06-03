import EstudiantesPage from "./pages/EstudiantesPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EstudianteForm from "./components/EstudianteForm";
import HomePage from "./pages/HomePage";
import { useEstudiante } from "./hooks/useEstudiante";
import DetalleEstudiante from "./pages/DetalleEstudiante";


/* Es un componente funcional, no tiene sentido que no tenga return */
/* Esto de afuera es javaScript */
function App() {

  const { estudiantes, agregarEstudiante, eliminarEstudiante, editarEstudiante } = useEstudiante();
  /* Se retorna lo que se quiere mostrar */
  return (
    /* Se pone lo que el usuario debe ver, el componente que se va a mostrar*/
    /* Codigo .JSX no es html*/
    //Solo se puede retornar un elemento, por lo tanto se usa un contenedor que tenga a los otros elementos
    <BrowserRouter>
      <Routes>
        <Route path="/estudiantes" element={<EstudiantesPage estudiantes={estudiantes} onEliminar={eliminarEstudiante} />}></Route>
        <Route path="/estudiantes/nuevo" element={<EstudianteForm onAgregar={agregarEstudiante} />}></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/estudiantes/:id/detalle" element={<DetalleEstudiante />}></Route>
        <Route path="/estudiantes/:id/editar" element={<EstudianteForm onEditar={editarEstudiante} />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App;