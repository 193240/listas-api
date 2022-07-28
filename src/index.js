const express = require('express');
const morgan = require('morgan');
const app = express();
//require('dotenv').config({ path: path.resolve(__dirname, '../.env') });//solucion poir que no encontraba el .env
// const connection = require('./database'); 

// settings
app.set('port', process.env.PORT || 4000);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
app.use(require('./routes'));
app.use('/list', require('./routes/list'));
app.use('/list-details', require('./routes/list_detalles'));

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});


