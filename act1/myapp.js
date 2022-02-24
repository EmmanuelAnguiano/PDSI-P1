const express = require('express')
const app=express()
const appConfig=require('./config')

require('dotenv').config()
process.env.APP_PORT

app.listen(appConfig.port, ()=>
console.log('puesto en marcha en el puerto ${port}'))