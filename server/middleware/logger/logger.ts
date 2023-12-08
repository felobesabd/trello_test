import {createLogger, format, transports} from "winston";

export const logger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({
            level: 'warn',
            filename: 'middleware/logger/logsWarnings.log'
        }),
        new transports.File({
            level: 'error',
            filename: 'middleware/logger/logsErrors.log'
        }),
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        format.metadata(),
        format.prettyPrint()
    )
});

// const myFormat = format.printf(({ level, meta, timestamp })=> {
//     return `${timestamp} ${level} ${meta}`
// })
//
// export const loggerError = createLogger({
//     transports: [
//         new transports.File({
//             level: 'error',
//             filename: 'middleware/logger/logsInternalErrors.log'
//         })
//     ],
//     format: format.combine(
//         format.json(),
//         format.timestamp(),
//         myFormat
//     )
// })