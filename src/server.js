// dados
const proffys = [ 
    {name: "Diego Fernandes",
     avatar:"https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4" 
    , whatsapp:"89923456",
     bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
      subject: "Química", 
      cost: "20", weekday:[0],
      // converter em segundos
      time_from:[720], time_to:[1220]
    },
    {name: "Lucas Tavares",
     avatar:"https://avatars3.githubusercontent.com/u/42820431?s=460&u=c1ac4c5392a8d79d26d1a12185060b4b696cdcac&v=4" 
    , whatsapp:"89923456",
     bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
      subject: "Matemática", 
      cost: "100", 
      weekday:[0],
      // converter em segundos
      time_from:[720], time_to:[1220]
    },
]

const subjects = [
"Artes",
"Biologia",
"Ciências",
"Educação física",
"Física",
"Geografia",
"História",
"Matemática",
"Português",
"Química"
]


const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]


//funcionalidades

function getSubject(subjectNumber){
    const position = +subjectNumber -1
    return subjects[position]
}
function pageLanding(req, res){
    return res.render ("index.html")
}

function pageStudy (req, res) {
    //para receber os dados e continuar com eles na pagina:
    const filters = req.query // req.query = requisita os dados
    return res.render ("study.html", {proffys, filters, subjects, weekdays})
}

function pageGiveClasses (req ,res) {
    const data = req.query

        //se tiver dados
    const isNotEmpty = Object.keys(data).length > 0
    if (isNotEmpty){

        data.subject = getSubject(data.subject)
        //adicionar dados a lista de proffys
        proffys.push(data)
        return res.redirect("/study")
    }
    
    
    // se não, mostrar a pagina
    return res.render ("give-classes.html", {subjects, weekdays})
    
}


//servidor
const express = require('express')
const server = express()

//configurar nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

// Início configuração do servidor
server
//configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))
//rotas da aplicação
.get("/", pageLanding)

.get("/study", pageStudy)

.get("/give-classes", pageGiveClasses)
// start do servidor
.listen(5500)
