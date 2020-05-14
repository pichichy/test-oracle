const oracledb = require('oracledb');
const db = require('./oracle-conexion');

require('./sql');

let binds, options, result;

let listaEmpleados = (callback) => {

    let params = {};

    db.doConnect((err, connection) => {
        if (err) {
            callback(err);
        } else {
            const option = { autoCommit: false, outFormat: oracledb.OBJECT, maxRows: 100 };
            db.doExecute(connection, sql_listaEmpleados, params, option, (err, result) => {
                if (err) {
                    callback(err);
                } else {

                    callback(null, result.rows);
                }
            })
        }
    });

};

let getEmpleado = (parametro, callback) => {

    let params = { k: parametro };

    db.doConnect((err, connection) => {
        console.log("INFO: Database - Retrieving sysdate FROM DUAL");

        if (err) {
            callback(err);
        } else {
            const option = { maxRows: 1 };
            db.doExecute(connection, sql_getEmpleado, params, option, (err, result) => {

                if (err) {
                    db.doRelease(connection); // RELEASE CONNECTION
                    callback(err); // ERROR
                } else {
                    db.doRelease(connection); // RELEASE CONNECTION
                    callback(null, result.rows[0]); // ALL IS GOOD
                }
            });
        }

    });

};


let getDatosBasicos = (rut, callback) => {

    db.doConnect((err, connection) => {

        if (err) {
            callback(err);
        } else {
            console.log("INFO: Database - Retrieving sysdate FROM DUAL");

            let params = { rut: rut };
            const option = { autoCommit: false, outFormat: oracledb.OBJECT, maxRows: 100 };

            db.doExecute(connection, sql_datos_basicos, params, option, (err, result) => {
                if (err) {
                    db.doRelease(connection); // RELEASE CONNECTION
                    callback(err); // ERROR
                } else {
                    db.doRelease(connection);
                    callback(err, result.rows); // ALL IS GOOD
                }

            });
        }
    });
};

module.exports = {
    listaEmpleados,
    getEmpleado,
    getDatosBasicos
}