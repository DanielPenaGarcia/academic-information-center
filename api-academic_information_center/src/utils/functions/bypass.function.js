import { API_NAME } from "../constanst/api-name.constant.js";

const publicPaths = [
  `/${API_NAME}/auth/login/teacher`,
  `/${API_NAME}/auth/login/student`,
  `/${API_NAME}/auth/login/administrator`,
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
