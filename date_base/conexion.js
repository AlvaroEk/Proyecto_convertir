const mysql = require('mysql2');

function createConnection(){

    const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'zafiro123',
    database: 'pagina_convertir'
});
return connection;
}
module.exports ={
    createConnection
};