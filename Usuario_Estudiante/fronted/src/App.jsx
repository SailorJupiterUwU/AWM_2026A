import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetalleEstudiante from './pages/DetalleEstudiante';
import EstudianteForm from './pages/EstudianteForm';
import EstudiantePage from "./pages/EstudiantePage";
import HomePage from "./pages/HomePage";
import UserForm from "./pages/UserForm";
import LoginForm from './pages/LoginForm';
import RutaProtegida from './components/RutaProtegida';
import { useEstudiante } from './hooks/useEstudiante';
import { useUser } from "./hooks/useUser";

function App() {
  const { estudiantes, agregarEstudiante, eliminarEstudiante, editarEstudiante, getEstudiante } = useEstudiante();
  const { agregarUser, loginUser } = useUser();

  return (
    <BrowserRouter>
      <Routes>


        <Route path="/estudiantes" element={<RutaProtegida><EstudiantePage estudiantes={estudiantes} onEliminar={eliminarEstudiante} /> </RutaProtegida>}></Route>
        <Route path="/estudiantes/nuevo" element={<RutaProtegida><EstudianteForm onAgregar={agregarEstudiante} /></RutaProtegida>}></Route>
        <Route path="/estudiantes/:id/detalle" element={<RutaProtegida><DetalleEstudiante onGetEstudiante={getEstudiante} /> </RutaProtegida>}></Route>
        <Route path="/estudiantes/:id/editar" element={<RutaProtegida><EstudianteForm onEditar={editarEstudiante} onGetEstudiante={getEstudiante} /> </RutaProtegida>}></Route>
        
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginForm onLogin={loginUser} />}></Route>
        <Route path="/usuarios/nuevo" element={<UserForm onAgregarUser={agregarUser} />}></Route>

      </Routes >
    </BrowserRouter >
  )
}

export default App
