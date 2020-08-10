//servidor
const express = require('express')
const server = express()
const { 
    pageLanding,
    pageStudy,
    pageSuccess,
    pageGiveClasses,
    saveClasses
} = require ('./pages.js')

//configurar nunjucks (template engine)
const nunjucks = require('nunjucks')
const format = require('./utils/format.js')
const { urlencoded } = require('express')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

// Início configuração do servidor
server

//receber os dados do req.body
.use(express.urlencoded({extended: true}))
//configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))
//rotas da aplicação
.get("/", pageLanding)

.get("/study", pageStudy)
.get ("/success", pageSuccess)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
// start do servidor
.listen(5500)
