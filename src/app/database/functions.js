'use strict';

const db = require('./index');

async function createTable() {
    const conn = await db.connect();
    const sql = 'CREATE TABLE IF NOT EXISTS comentarios (idcomentarios INT UNSIGNED NOT NULL AUTO_INCREMENT,comentarioscol VARCHAR(500),PRIMARY KEY (idcomentarios)) ENGINE=InnoDB  DEFAULT CHARSET=utf8;';
    await conn.query(sql).catch(err => {
        throw err;
    });
}

async function selectCostumers() {
    const conn = await db.connect();
    const [rows] = await conn.query('SELECT * FROM comentarios;');
    return rows;
}

async function insertCostumer(costumer){
    const conn = await db.connect();
    const sql = 'INSERT INTO comentarios(comentariosCol) VALUES (?);';
    const values = [costumer.comentario];
    return await conn.query(sql, values);
}

async function deleteCostumer(id){
    const conn = await db.connect();
    const sql = 'DELETE FROM comentarios where idcomentarios=?';
    return await conn.query(sql, [id]);
}

module.exports = {
    selectCostumers,
    insertCostumer,
    deleteCostumer,
    createTable
};

