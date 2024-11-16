import { dataSource } from "../config/orm.config.js";
import { UserSchema } from "../schemas/user.schema.js";
import { UnauthorizedException } from "../utils/exceptions/http/unauthorized.exception.js";
import { byPass } from "../utils/functions/bypass.function.js";
import { validateToken } from "../utils/functions/validate-token.function.js";

export const guard = async (req, res, next) => {
  try {
    const pass = byPass(req);
    if (pass) {
      return next();
    }
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
      throw new UnauthorizedException();
    }
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      throw new UnauthorizedException();
    }
    const { academicId, role } = validateToken(token);
    const userRepository = dataSource.getRepository(UserSchema);
    const user = await userRepository.findOne({
      where: {
        academicId: academicId,
        role: role,
      },
      select: {
        id: true,
        academicId: true,
        role: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
