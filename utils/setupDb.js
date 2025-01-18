const mysql = require("mysql2/promise");
const dotenv = require('dotenv');
dotenv.config();

async function setupDatabase(client) {

    const db = await mysql.createConnection({
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

    const incrementPawned = async function (messageContent, type, userid) {
        await db.query(`
            INSERT INTO pawned (MessageContent, Type, userid)
            VALUES (?, ?, ?)
        `, [messageContent, type, userid]);
    }

    const getPawned = async function (userid) {
        const [rows] = await db.query(`
            SELECT * FROM pawned WHERE userid = ?
        `, [userid]);
        return rows;
    }

    const getPawnedByType = async function (type) {
        const [rows] = await db.query(`
            SELECT * FROM pawned WHERE Type = ?
        `, [type]);
        return rows;
    }

    client.incrementPawned = incrementPawned;
    client.getPawned = getPawned;
    client.getPawnedByType = getPawnedByType;
}

module.exports = setupDatabase;