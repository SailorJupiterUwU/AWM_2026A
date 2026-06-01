import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TallerPage from './pages/TallerPage'
import TallerForm from './pages/TallerForm'
import DetalleTaller from './components/DetalleTaller'
import useTaller from './hooks/useTaller'
import { useParams } from "react-router-dom";
import './App.css'

function App() {
  const {talleres, agregarTaller} = useTaller()
  const id = useParams()
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/talleres' element={<TallerPage talleres={talleres}/>} ></Route>
        <Route path='/crear' element={<TallerForm onAgregar={agregarTaller}/>}></Route>
        <Route path='/taller/:id' element={<DetalleTaller id={id}/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
