require("./config/mongoose.config")
const express = require("express")
const cors = require("cors")
const app = express();
const PUERTO = 8000;

const allTalleresRoutes = require("./routes/talleres.routes")
const allUsuarioRoutes = require("./routes/usuario.routes")

app.use(express.json())
app.use(cors())

allTalleresRoutes(app)
allUsuarioRoutes(app)

app.listen(PUERTO, ()=>console.log("Servidor escuchando en el puerto: ", PUERTO))