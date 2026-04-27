//referencia al elemento
/*const insertarEstudiante = ()=>{
    const titulo = document.getElementById("principal");
    titulo.style.backgroundColor = "blue";
    titulo.innerText = "Hola"
}*/
//var estudiante={id:1, nombre:"Danny Guaman"};
const lstestudiantes=[
    {id:1, nombre:"pepe"},
    {id:2, nombre:"Cristina"},
    {id:2, nombre:"Daniel"}
];

/*lstestudiantes.forEach((estudiante)=>{
    console.log(estudiante);
});*/

//Agregar estudiante
const renderizarListaEstudiantes = () => {
    const divContendeor = document.getElementById("contenedor");
    divContendeor.innerText="";
    lstestudiantes.forEach((estudiante)=>{
        const itemEstudiante = document.createElement("p");
        itemEstudiante.innerText = estudiante.nombre;
        divContendeor.appendChild(itemEstudiante);
    });
}

//cambiar color

/*function hola(){
    return console.log("Hola");
}*/
const insertarEstudiante = (event) =>{

    event.preventDefault();
    const nombreIngresado = document.getElementById("txtNombre").value;
    lstestudiantes.push({id:0, nombre: nombreIngresado});
    renderizarListaEstudiantes();
}