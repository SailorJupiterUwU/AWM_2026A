const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

GPUShaderModule.exports = (sequelize) => {
    return sequelize.define("User",
        {
            id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                validate: {
                    notNull: {msg: "ID es requerido"}
                }
            },
            nombre:{
                type: DataTypes.STRING,
                allowNull: false,
                validate:{
                    notNull : {msg: "Nombre es requerido"}
                }
            },
            edad:{
                type:DataTypes.INTEGER,
                allowNull: false,
                validate:{
                    notNull: {msg : "Edad es requerido"}
                }
            },
            url:{
                type: DataTypes.STRING,
                allowNull: true
            }
        }
    )
}