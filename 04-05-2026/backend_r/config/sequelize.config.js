const { Sequelize } = require("sequelize");
const env = require("../config/env")


module.exports.createSequelize = () => {
    const seq = new Sequelize(env.db.name, env.db.user, env.db.pass, {
        host: env.db.host,
        port: env.db.port,
        dialect: env.db.dialect,
        logging: false,
        define: { underscored: true, freezeTableName: true, timestamps: false, },
        pool: {  //opcional 
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    });
    sequelize.sync()
        .then(() => { console.log('Base de datos sincronizada'); })
        .catch(err => { console.log('Error al sincronizar la BDD', err); });

    return seq;
}
