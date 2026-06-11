const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const Estudiante = sequelize.define("estudiante", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: DataTypes.STRING,
    edad: DataTypes.INTEGER,
    url: DataTypes.STRING

},
    {
        timestamps: false,
    }
);

module.exports = Estudiante;