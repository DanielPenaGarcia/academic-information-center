import { SeedService } from "./seed.service.js";

export class SeedController {
  constructor() {
    this.seedService = new SeedService();
  }

  async seed(req, res, next) {
    try {
      await this.seedService.seed();
      return res.status(201).json({ message: "Database seeded", status: 201 });
    } catch (error) {
      next(error);
    }
  }
}
