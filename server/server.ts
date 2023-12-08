import {logger } from "./middleware/logger/logger";

const dotEnv = require('dotenv');
import express from 'express';

const winston = require('winston'),
    expressWinston = require('express-winston');

import {DatabaseConnection} from "./database/DatabaseConnection";
import {errHandler} from "./middleware/ErrorMiddleware";
import {mountRoute} from "./MountRoute";
import {createLogger, format, transports} from "winston";

(async () => {

    dotEnv.config();

    await DatabaseConnection.dbConnection();

    const app = express();

    app.use(express.json());

    app.get('/', (req,res)=> {
        res.send("hello");
    });

    app.use(expressWinston.logger({
        winstonInstance: logger,
        statusLevels: true
    }))

    // Boards Route
    mountRoute(app);

    const myFormat = format.printf(({ level, meta, timestamp })=> {
        return `${timestamp} ${level} ${meta}`
    })

    app.use(expressWinston.errorLogger({
        transports: [
            new transports.File({
                filename: 'middleware/logger/logsInternalErrors.log'
            })
        ],
        format: format.combine(
            format.json(),
            format.timestamp(),
            myFormat
        )
    }))

    app.use(errHandler);

    const PORT = process.env.PORT || 3000;
    const server =  app.listen(PORT , ()=> {
        console.log(`App running ${PORT}`)
    })

    process.on("unhandledRejection", (err: any)=> {
        console.log(`UnhandledRejection Errors: ${err.name} | ${err.message}`)
        server.close(()=> {
            console.error(`Shutting down....`);
            process.exit(1)
        })
    })

})();