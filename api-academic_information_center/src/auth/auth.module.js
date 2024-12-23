import express from "express";
import { AuthController } from "./auth.controller.js";
import { userSerializable } from "./middlewares/user-login.middleware.js";

export const router = express.Router();

const authController = new AuthController();
const path = "/auth";

const middlewares = (req, res, next) => {
  userSerializable(req, res, next);
};

router.post(
  `${path}/login`,
  middlewares,
  authController.postLoging.bind(authController)
);