import { TOKEN_COOKIE } from "../utils/constanst/token-cokie.constant.js";
import jwt, { decode } from "jsonwebtoken";

const publicPaths = ['auth/login/teacher', 'auth/login/student', 'auth/login/administrator'].map(path => `/api/${path}`);

export const guard = (req, res, next) => {
    if (publicPaths.includes(req.path)) {
        return next();
    }
    const token = req.cookies[TOKEN_COOKIE];
    if (!token) {
        return res.status(401).send('Unauthorized');
    }
    try {
        const decoded = jwt.verify(token, 'secret');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send('Unauthorized');
    }
};
