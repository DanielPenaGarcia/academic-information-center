import { beforeInsertUser } from "../triggers/before-insert-user.js";

export const excecuteAllTriggers = async (dataSource) => {
    beforeInsertUser(dataSource);
};