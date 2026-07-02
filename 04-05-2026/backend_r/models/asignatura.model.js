const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const Asignatura = sequelize.define('Asignatura', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull: {message: "El nombre de la materia es obligatoria"}
        }
    }
},
    {
        timestamps: false,
    }
);

module.exports = Asignatura;