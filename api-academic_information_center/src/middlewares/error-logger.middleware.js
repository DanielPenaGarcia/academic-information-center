export const errorLogger = (err, req, res, next)=>{
    logger.error(err.stack);
    next(err, req, res, next)
}