import express from "express";
import { AuthController } from "./auth.controller.js";
import { serializable } from "../middlewares/serializable.middleware.js";
import { userSerializable } from "./middlewares/user-login.middleware.js";

export const router = express.Router();

const authController = new AuthController();
const authPath = "/auth";

const middlewares = (req, res, next) => {
  userSerializable(req, res, next);
};

router.post(
  `${authPath}/login`,
  middlewares,
  authController.postLoging.bind(authController)
);