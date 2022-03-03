require('dotenv').config()
const express = require('express')
const app = express()
const { appConfig } = require('./lib/config')
const connection = require('./db/mysql');

app.get('/', function(req, res) {
  res.sendfile('./views/index.html');
    let gety = Date.now();
    connection.query('INSERT INTO cone(id, val) VALUES (?,?)', [gety, 'raiz'])
}); 

app.get('/add', function(req, res) {
  res.sendfile('./views/add.html');
    let gety = Date.now();

    connection.query('INSERT INTO cone(id, val) VALUES (?,?)', [gety, 'add'])
});

app.listen(appConfig.port, ()=> console.log(`Puesto en marcha en puerto ${appConfig.port}`))