import EstudiantesPage from "./pages/EstudiantesPage";
/* Es un componente funcional, no tiene sentido que no tenga return */
/* Esto de afuera es javaScript */
function App(){
  /* Se retorna lo que se quiere mostrar */
  return (
    /* Se pone lo que el usuario debe ver, el componente que se va a mostrar*/
    /* Codigo .JSX no es html*/
    //Solo se puede retornar un elemento, por lo tanto se usa un contenedor que tenga a los otros elementos
    <div>
      <EstudiantesPage/>
    </div>
  )
}
export default App;