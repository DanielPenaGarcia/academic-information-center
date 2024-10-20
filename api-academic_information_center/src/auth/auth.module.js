import express from "express";
import { AuthController } from "./auth.controller.js";
import { serializable } from "./middleware/serializable.middleware.js";

export const router = express.Router();

const authController = new AuthController();
const authPath = "/auth";

const middlewares = (req, res, next) => {
  serializable(req, res, next);
};

router.post(
  `${authPath}/login/teachers`,
  middlewares,
  authController.postLoginTeacher.bind(authController)
);

router.post(
  `${authPath}/login/students`,
  middlewares,
  authController.postLoginStudent.bind(authController)
);

router.post(
  `${authPath}/login/administrators`,
  middlewares,
  authController.postLoginAdministrator.bind(authController)
);

router.delete(`${authPath}/logout`, authController.deleteLogout.bind(authController));

router.get(
  `${authPath}/user`,
  middlewares,
  authController.getUser.bind(authController)
);
