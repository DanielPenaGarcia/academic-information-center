const winston = require('winston');

export const logger = winston.createLogger({
  level: 'error',
  transports: [
    new winston.transports.File({ filename: 'error.log' })
  ]
});