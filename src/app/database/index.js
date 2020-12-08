'use strict';

async function connect() {
    if (global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require('mysql2/promise');
    // Credenciais do banco MYSQL
    const connection = await mysql.createConnection('mysql://usuario:senha@host/nome-do-banco');

    console.log('Conectou no mysql');
    global.connection = connection; 
    return connection;
}

module.exports = {
    connect
}