const express = require('express');
const app = express();
app.use(require('./routing'));

require('./env');


app.listen(process.env.PORT, () => {
    console.log('==========================');
    console.log(`INCIANDO EN EL PUERTO ${process.env.PORT}`);
    console.log('==========================');
});