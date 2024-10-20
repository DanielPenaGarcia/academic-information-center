import express from "express";
import { AuthController } from "./auth.controller.js";
import { serializable } from "./middleware/serializable.middleware.js";

export const router = express.Router();

const authController = new AuthController();

router.post(
  "/auth/login/teachers",
  serializable,
  authController.teacherLogin.bind(authController)
);
router.post(
  "/auth/login/students",
  serializable,
  authController.studentLogin.bind(authController)
);
router.post(
  "/auth/login/administrators",
  serializable,
  authController.administratorLogin.bind(authController)
);
router.delete(
  "/auth/logout",
  authController.logout.bind(authController)
);
