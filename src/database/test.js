const Database = require('./db.js')
const createProffy = require('./createProffy')

// função curta: () =>
Database.then(async (db) => {
    //Inserir dados

     proffyValue = {
        name: "Lucas Tavares",
        avatar: "https://avatars3.githubusercontent.com/u/42820431?s=460&u=c1ac4c5392a8d79d26d1a12185060b4b696cdcac&v=4",
        whatsapp: "83996909073",
        bio: "Professor de programação web das seguintes tecnologias: HTML5, CSS3 e JavaScript."

    }

    classValue = {
        subject: 1,
        cost: "200",
        // o proffy id vem pelo banco de dados
    }

    classScheduleValues = [
        // class_id vem pelo banco de dados após cadastrar 
        {
            weekday: "1",
            time_from: "720",
            time_to: "1220"
        },
        {    
            weekday: "0",
            time_from: "520",
            time_to: "1220"
        }
    ]

    // await createProffy(db,{proffyValue, classValue, classScheduleValues})


    //Consultar os dados inseridos
    // proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
      //  console.log(selectedProffys)

    //consultar os dados de um determinado professor e trazer os dados junto

    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
  //  console.log(selectClassesAndProffys)
    
    // o horário que a pessoa trabalha, por exemplo, é das 8h até as 18h
    // o horário do time_from (8h) precisa ser antes ou igual ao horário solicitado
    // o time_to precisa ser OBRIGATORIAMENTE acima

    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "1300"
        AND class_schedule.time_to > "1300"
        
    `)

    console.log(selectClassesSchedules)
})