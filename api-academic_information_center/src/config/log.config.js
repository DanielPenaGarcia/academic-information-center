const winston = require('winston');

export const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.File({ filename: 'error.log.json', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log.json' })
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.errors({ stack: true, message: true, statusCode: true, method: true, path: true }),
  )
});