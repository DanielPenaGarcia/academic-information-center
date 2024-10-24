import { logger } from "../config/log.config.js";

export const errorHandler = (err, req, res, next)=>{
    logger.error(err)
    if (!err.statusCode){
        return res.status(500).send("Something went wrong: "+err.message);  
    }
    return res.status(err.statusCode).send(err.message); 
}