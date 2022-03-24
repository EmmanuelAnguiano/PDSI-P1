require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { appConfig } = require('./lib/config')
const connection = require('./db/mysql.js')

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'pug');

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/registro', function(req, res) {
    res.render('registro');
});

app.get('/ingreso', function(req, res) {
    res.render('ingreso');
});

app.get('/regisp', function(req, res) {
    connection.query('SELECT * FROM pelis' ,function(err, result, fields){
       //console.log(result[0]['titulo'])     
        res.render('regisp',{data:result})
    })
    
});

app.get('/404', function(req, res) {
    res.render('404');
});

app.post('/registroUser', function(req, res) {
    if(req.body.registro == ""){
        let pass  = (req.body.pass)
        connection.query('INSERT INTO users(username, correo, contraseña) VALUES (?, ?, ?)',[req.body.username, req.body.email, pass], function(err, result, fields){
            
            if (err) throw err;
            res.redirect('/')
            
        })
       }else{
        res.redirect('/')
       }
});

app.post('/auth', function(req, res) {

    if(req.body.sesion == ""){
    let pass = (req.body.pass)
       res.render('ingreso', {correo: req.body.email, pass: pass});
       }else{
           res.redirect('/registro')
       }
});

app.post('/registroPeli', function(req, res) {
    connection.query('INSERT INTO pelis(titulo, descripcion, fecha) VALUES (?, ?, ?)',[req.body.titulo, req.body.descripcion, req.body.fecha], function(err, result, fields){
        
        if (err) throw err;
        res.redirect('/')
        
    })
});
/*
app.post('/pelisr', function(req, res){
    connection.query('SELECT * FROM pelis' ,function(err, result, fields){
        console.log('entro')     
    })
});
*/
app.post('/auth', function(req, res) {
    
    if(req.body.sesion == ""){
        let pass = md5(req.body.pass)
        
        var sql = 'SELECT username, correo, contraseña FROM examenpdi.users WHERE email = "' + req.body.email +'" AND pass = "' + pass +'"';
        
        connection.query(sql , function(err, resp, fields){
            if(resp.length){
                res.render('dash', {correo: resp[0].email});
            }else{
                res.redirect('/404')
            }
        });
        
    }else{
        res.redirect('/registro')
    }
});

app.listen(appConfig.port, ()=> console.log(`Puesto en marcha en puerto ${appConfig.port}`)) 