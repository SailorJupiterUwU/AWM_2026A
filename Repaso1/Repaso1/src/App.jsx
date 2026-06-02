import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SitioTuristico from './components/SitioTuristico'
import SitioForm from './components/SitioForm';

import './App.css'
import SitioTuristicoPage from './pages/SitioTuristicoPage';
import { useTuristico } from './hooks/useTuristico';


function App() {
  const { sitios, agregarSitio } = useTuristico();
  return (

    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/sitio' element={<SitioTuristicoPage sitios={sitios} darLike={darLike} />}></Route>
          <Route path='/sitio/new' element={<SitioForm onAgregar={agregarSitio} />}></Route>
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App;
