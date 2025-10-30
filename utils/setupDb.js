const mysql = require("mysql2/promise");
const dotenv = require('dotenv');
dotenv.config();

let db;

async function setupDatabase(client) {

    db = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    db.on("ready", () => {
    console.log("Database is ready!");
    });

    await db.query(`
        CREATE TABLE IF NOT EXISTS pawned (
            Id INT AUTO_INCREMENT PRIMARY KEY,
            MessageContent VARCHAR(4000),
            Type VARCHAR(255),
            userid BIGINT,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
}

async function incrementPawned (messageContent, type, userid) {
    await db.query(`
        INSERT INTO pawned (MessageContent, Type, userid)
        VALUES (?, ?, ?)
    `, [messageContent, type, userid]);
}

async function getPawned(userid) {
    const [rows] = await db.query(`
        SELECT * FROM pawned WHERE userid = ?
    `, [userid]);
    return rows;
}

async function getPawnedByType(type) {
    const [rows] = await db.query(`
        SELECT * FROM pawned WHERE Type = ?
    `, [type]);
    return rows;
}

async function getAllPawnedStats() {
    const [rows] = await db.query(`
        SELECT Type, COUNT(*) as count
        FROM pawned
        GROUP BY Type
    `);
    return rows;
}

module.exports = {
    setupDatabase,
    incrementPawned,
    getPawned,
    getPawnedByType,
    getAllPawnedStats,
};
