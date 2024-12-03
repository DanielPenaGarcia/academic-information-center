import { logger } from "../config/log.config.js";

export const errorHandler = (err, req, res, next) => {
  if (err) {
    logger.error({ ...err, method: req.method, path: req.path });
    return res.status(err.status || 500).json({
      message: err.message || "Internal Server Error",
      status: err.status || 500,
    });
  }
};
