import winston, { format } from "winston";
import config from '../config'

const { logDir, env } = config;
const isDev = env === 'development';


const logFileFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.splat(),
    winston.format.errors({ stack: true })
)

const logConsoleFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.errors({ stack: true }),
    winston.format.timestamp({format: "HH:mm:ss"}),
    winston.format.printf( ({timestamp, level, message, stack }) =>
    {
       return `[${timestamp}] ${level}: ${message}` + (stack ? `\n${stack}` : "");
    })
)

const logger = winston.createLogger(
    {
        level: 'info',
        format: winston.format.json(),
        defaultMeta: { service: 'user-service' },
        transports: [
            new winston.transports.File({ filename: `error.log`,dirname:logDir, level: 'error',format:logFileFormat }),
            new winston.transports.File({ filename: `combined.log`,dirname:logDir, format:logFileFormat })
        ],
        exceptionHandlers: [
            new winston.transports.File({ filename: `exceptions.log`,dirname:logDir, level: 'error',format:logFileFormat })
        ]
    }
);

if (isDev)
{
    logger.add(new winston.transports.Console({format:logConsoleFormat}));
    logger.level = "debug"
}
export default logger;
