
const express = require("express");
const cors = require("cors");
const app = express();
const puerto = 8000;


require("./config/mongoose.config")
app.use(cors());

//Definicion de ruta
/*req y res son arametros posicionales y son objetos
req representa un objeto con toda la informacion realizada por el cliente
res objeto que contiene toda la informacion, metodos o fuciones que permiten reponder a la solicitud de un cliente
_ para poner la variable que no se necesite*/
/*app.get("/", (req, res) => {
    console.log("Ejecutando endpoint owo")*/
    //res.json({"mensaje":"Hola OwO"})
    /* Es necesario cerrar el ciclo solicitud respuesta, devolviendo cualquier cosa que se necesite */
    /*res.send("Hola UwU")
})

app.get("/estudiantes", (req, res) => {

    res.json({"mensaje": "Endpoint para obtener lista de Estudiantes"})
})

app.get("/estudiantes/:id/detalle", (req, res) => {
    const {id} = req.params
    res.json({"mensaje": `Endpoint para obtener estudiante con id: ${id}`})
})

app.delete("/estudiantes/:id/detalle", (req, res) => {
    const {id} = req.params
    res.json({"mensaje":`Endpoint para eliminar estudiante con id: ${id}`})
})
//Este siempre se pone al ultimo,despues de haber definido el restop de acciones
app.listen(puerto, () => console.log("El servidor esta escuchando en el puerto: ", puerto))*/

/*proposito de mongus.config.js es establecer el string conexion con la bdd mongo db */

const allEstudiantesRoutes = require("./routes/estudiante.routes")
app.use(express.json());
allEstudiantesRoutes(app);

app.listen(puerto, () => {
    console.log("Servidor escuchando en l puerto: ", puerto)
})