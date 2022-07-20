const express = require("express");
const logger = require("morgan");
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors')
app.use(logger("dev"));

const indexRouter = require("./routes/index");
const usuarioRouter = require('./routes/usuarioRouter')
const { isAuth } = require('./middlewares/authMiddleware')
const pacienteRouter = require('./routes/pacienteRouter')
const entrenamientoRouter = require('./routes/entrenamientoRouter')
const ejercicioRouter = require('./routes/ejercicioRouter')
const centromedicoRouter = require('./routes/centromedicoRouter')
const maquinaRouter = require('./routes/maquinaRouter')
const doctorRouter = require('./routes/doctorRouter')
const asistenteRouter = require('./routes/asistenteRouter')

//cors
app.use(cors())

//middleware
    //body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/", indexRouter);
app.use('/auth', usuarioRouter)
app.use('/pacientes', pacienteRouter)
app.use('/entrenamientos', entrenamientoRouter)
app.use('/ejercicios', ejercicioRouter)
app.use('/centromedicos', centromedicoRouter)
app.use('/maquinas', maquinaRouter)
app.use('/doctors', doctorRouter)
app.use('/asistentes', asistenteRouter)

//erros
app.use((req, res, next) => {
    var error = new Error('Not found.')
    error.status = 404
    next(error)
})

app.use((err, req, res, next) => {
    const status = err.status || 500;
    if (status >= 500) console.log(err);
    res.status(status).send({
        error: err.message
    })
})

module.exports = app;