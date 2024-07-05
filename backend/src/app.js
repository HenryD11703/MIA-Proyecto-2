const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();


app.use(morgan('dev'));
app.use(cors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization'
}));
app.use(express.urlencoded({ limit: '500mb', extended: true }));
app.use(express.json({limit: '500mb'}));

app.get('/', (req, res) => {
    res.status(200).json(
        {
            message: 'Hola mundo'
        }
    );
});

app.use('/admin', require('./routes/admin.routes'));
app.use('/usuario', require('./routes/usuario.routes'));
app.use('/recepcion', require('./routes/recepcion.routes'));


module.exports = app;