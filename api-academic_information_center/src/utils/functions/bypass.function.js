import { API_PATH } from "../constanst/api-path.constant.js";

const publicPaths = [`${API_PATH}/auth/login`, `${API_PATH}/seed`];

export const byPass = (req) => {
  const path = req.path;
  return publicPaths.includes(path);
};
