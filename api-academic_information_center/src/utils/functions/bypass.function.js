import { API_PATH } from "../constanst/api-path.constant.js";

const publicPaths = [`${API_PATH}/auth/login`];

export const byPass = (req) => {
  const path = req.path;
  return publicPaths.includes(path);
};
