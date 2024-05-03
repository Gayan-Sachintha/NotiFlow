const mysql = require('mysql');

const sqlcon = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'notiflow'
});

module.exports = { sqlcon };