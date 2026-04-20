//referencia al elemento
/*const insertarEstudiante = ()=>{
    const titulo = document.getElementById("principal");
    titulo.style.backgroundColor = "blue";
    titulo.innerText = "Hola"
}*/

//Agregar estudiante
const insertarEstudiante = () => {
    const divContendeor = document.getElementById("contenedor");
    const itemEstudiante = document.createElement("p");
    itemEstudiante.innerText = "OwO";
    divContendeor.appendChild(itemEstudiante);
}

//cambiar color

/*function hola(){
    return console.log("Hola");
}*/

