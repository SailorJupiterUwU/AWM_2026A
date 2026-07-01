const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const Usuario = sequelize.define(
    "usuario",
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "El email es requerido menso (boink)"
                },
                notEmpty: {
                    msg: "El email es requerido menso (boink)"
                }
            }
        },
        rol: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "El rol es requerido xD"
                },
                notEmpty: {
                    msg: "El rol es requerido xD"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "La contraseña obvio es requerido >:v"
                },
                notEmpty: {
                    msg: "La contraseña obvio es requerido >:v"
                }
            }
        }
    },
    {
        tableName: "usuarios",
        timestamps: false // equivalente a { versionKey: false } de Mongoose, aunque no es exactamente lo mismo (ver nota abajo)
    }
);

module.exports = Usuario;