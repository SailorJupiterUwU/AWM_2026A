const express = require("express");
const cors = require("cors");
const app = express();
const puerto = 8000;


require("./config/mongoose.config");


app.use(cors());
app.use(express.json());


const allEstudiantesRoutes = require("./routes/estudiante.routes");
const allUsuariosRoutes = require("./routes/usuarios.routes"); 


allEstudiantesRoutes(app);
allUsuariosRoutes(app);


app.listen(puerto, () => {
    console.log("Servidor escuchando en el puerto: ", puerto);
});