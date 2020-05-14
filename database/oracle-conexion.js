process.env.ORA_SDTZ = 'UTC';

const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');

let doConnect = (callback) => {

    console.log(' INIT DO CONNECT ');

    oracledb.getConnection(dbConfig, (err, connection) => {

        if (err) {
            callback(err);
        } else {
            callback(null, connection);
        }

    });

    console.log(' PROCESANDO...');

}

let doExecute = (connection, sql, params, option, callback) => {

    connection.execute(sql, params, option, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }

    })

};

let doRelease = (connection, callback) => {

    connection.release((err) => {

        if (err) {
            console.log("ERROR: Unable to RELEASE the connection: ", err);
            callback(err);
        }

    });

}

module.exports = {
    doConnect,
    doExecute,
    doRelease

}