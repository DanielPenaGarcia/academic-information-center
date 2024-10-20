import express from "express";
import { AuthController } from "./auth.controller.js";
import { serializable } from "./middleware/serializable.middleware.js";

export const router = express.Router();

const authController = new AuthController();

router.post(
  "/auth/login/teacher",
  serializable,
  authController.teacherLogin.bind(authController)
);
router.post(
  "/auth/login/student",
  serializable,
  authController.studentLogin.bind(authController)
);
router.post(
  "/auth/login/administrator",
  serializable,
  authController.administratorLogin.bind(authController)
);
router.delete(
  "/auth/logout",
  authController.logout.bind(authController)
);
