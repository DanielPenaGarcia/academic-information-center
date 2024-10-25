import { logger } from "../config/log.config";

export const errorHandler = (err, req, res, next) => {
  if (err) {
    logger.error({ ...err, method: req.method, path: req.path });
    return res.status(err.statusCode || 500).json({
      message: err.message || "Internal Server Error",
      statusCode: err.statusCode || 500,
    });
  }
};
