import { API_NAME } from "../constanst/api-name.constant.js";

const publicPaths = [
  `/${API_NAME}/auth/login/teachers`,
  `/${API_NAME}/auth/login/students`,
  `/${API_NAME}/auth/login/administrators`,
  `/${API_NAME}/auth/logout`,
];

export const byPass = (req, res) => {
  try {
    const path = req.path;
    return publicPaths.includes(path);
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
};
