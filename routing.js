const express = require('express');
const app = express();

const qry = require('./database/querys');

app.get('/empleados', (req, res) => {

    qry.listaEmpleados((err, result) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                result
            });
        }
    });
})


app.get('/empleado/:id', (req, res) => {

    let id = req.params.id;

    qry.getEmpleado(id, (err, result) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err

            });
        }

        if (result.length === 0) {
            res.status(400).json({
                ok: false,
                message: "no hay datos para el empleado consultado"
            });
        }

        res.json({
            ok: true,
            result

        });
    });

});

app.get('/datos/basicos/:rut', (req, res) => {

    let rut = req.params.rut;

    qry.getDatosBasicos(rut, (err, result) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            })
        } else {
            res.json(result[0])
        }

    });

});

module.exports = app;