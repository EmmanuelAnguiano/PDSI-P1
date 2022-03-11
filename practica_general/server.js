require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
//const md5 = require('md5')
const { appConfig } = require('./lib/config')
const connection = require('./db/mysql.js')

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'pug');

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/registro', function(req, res) {
    res.render('registro');
});

app.post('/registroUser', function(req, res) {
    if(req.body.registro == ""){
        let pass  = /*md5*/(req.body.pass)
        connection.query('INSERT INTO datos(usarname, correo, contraseña) VALUES (?, ?, ?)',[req.body.username, req.body.email, pass], function(err, result, fields){
            
            if (err) throw err;
            res.redirect('/')
            
        })
       }else{
        res.redirect('/')
       }
});

app.post('/auth', function(req, res) {

    if(req.body.sesion == ""){
    let pass = /*md5*/(req.body.pass)
       res.render('ingreso', {correo: req.body.email, pass: pass});
       }else{
           res.redirect('/registro')
       }
});

app.listen(appConfig.port, ()=> console.log(`Puesto en marcha en puerto ${appConfig.port}`)) 