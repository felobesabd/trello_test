import {Connection} from 'mysql2';

export let db: Connection;

export class DatabaseConnection {

    private constructor() {
    }

    static async dbConnection() {
        if (db !== undefined) {
            console.log(db)
            return;
        }

        // @ts-ignore
        db = await this.connectMysql();
    }

    private static async connectMysql() {
        const mysql = require('mysql2/promise');

        // create the connection to database
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });

        return connection;
    }

    static async query(sql: string, option?: unknown) {
        // @ts-ignore
        const [rows] = await db.query(sql, option)
        return rows;
    }

    static async getRow(sql: string, option?: unknown) {
        // @ts-ignore
        const [rows] = await db.query(sql, option)
        return rows[0];
    }

}