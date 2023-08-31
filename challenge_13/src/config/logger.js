import winston from "winston";

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4
    },
    color: {
        fatal: "red",
        error: "yellow",
        warning: "yellow",
        info: "blue",
        debug: "white"
    }
}

// export const logger = winston.createLogger({
//     levels: customLevelOptions.levels,
//     transports: [
//         new winston.transports.Console({ level: "http"}),
//         new winston.transports.File({filename: "./errors.log", level: "warn"})
//     ]
// });

export const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({ 
            level: "info",
            format: winston.format.combine(
                winston.format.colorize({colors: customLevelOptions.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: "./errors.log",
            level: "warning",
            format: winston.format.simple()
        })
    ]
});

export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleString()}`);
    next();
}