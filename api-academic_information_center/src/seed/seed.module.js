import express from "express";
import { SeedController } from "./seed.controller.js";

export const router = express.Router();

const seedController = new SeedController();

const seedPath = "/seed";

router.post(`${seedPath}`, seedController.seed.bind(seedController));