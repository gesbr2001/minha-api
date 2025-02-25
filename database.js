const sqlite3 = require ('sqlite3').verbose();

const db = new sqlite3.Database('./tasks.db', (err) => {
    if (err){
        console.error('Erro ao conectar no DB', err.message);
    } else {
        console.log('Conectado ao sqlite');
    }
});

db.serialize(() => {
    db.run (`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            title TEXT NOT NULL, 
            completed INTEGER DEFAULT 0
        )
    `);
});


module.exports = db;