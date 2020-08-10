module.exports = async function(db, {proffyValue, classValue, classScheduleValues}) {
    //inserir dados na tabela de professores 
    
    //await = só executa próxima linha após terminar essa (só da para usar o await se usar async antes de function)
   
   const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
   `)

   const proffy_id = insertedProffy.lastID

   //inserir dados na tabela classes

   const insertedClass = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                proffy_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"
            );
   `)

   const class_id = insertedClass.lastID

   // Inserir na tabela Schedule
     const insertedAllClassScheduleValues = classScheduleValues.map(
    (classScheduleValue) => {
           return db.run(`
           INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
           ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
           );
        `)          
     })

     // aqui vou executar todos os db.runs() do class Schedule
     
     await Promise.all(insertedAllClassScheduleValues)
}