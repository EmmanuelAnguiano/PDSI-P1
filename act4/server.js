require('dotenv').config()
const express = require('express')
const app = express()
const { appConfig } = require('./lib/config')
const bodyParser = require('body-parser')
const md5 = require('md5')
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'pug');


app.get('/', function(req, res) {
    res.render('index');
});

app.post('/ingreso', function(req, res) {
   let pass=md5(req.body.pass)
   res.render('ingreso',{email: req.body.email, pass: pass})
});

app.post('/eliminar', function(req, res) {
    //let pass=md5(req.body.pass)
    res.render('eliminar',{email: req.body.email, pass: req.body.pass})
 });

app.listen(appConfig.port, ()=> console.log(`Puesto en marcha en puerto ${appConfig.port}`))