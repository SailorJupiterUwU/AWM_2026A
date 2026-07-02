const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");
const Estudiante = require("./estudiante.model");
const Asignatura = require("./asignatura.model");

const Matricula = sequelize.define('Matricula', {
    matriculaFecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
},
    {
        timestamps: false,
    }
);

Estudiante.belongsToMany(Asignatura, { through: Matricula });
Asignatura.belongsToMany(Estudiante, { through: Matricula });

Matricula.belongsTo(Estudiante, { foreignKey: 'EstudianteId' })
Matricula.belongsTo(Asignatura, { foreignKey: 'AsignaturaId' })

module.exports = Matricula