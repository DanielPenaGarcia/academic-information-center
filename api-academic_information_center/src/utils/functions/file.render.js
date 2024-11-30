import { join } from "path";
import { readFile } from "fs";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export async function readContentFile(filePath) {
    const absoluteFilePath = join(__dirname, filePath);
    const fileContent = await new Promise((resolve, reject) => {
        readFile(absoluteFilePath, 'utf8', (err, fileContent) => {
            if (err) {
                return reject(err);
            }
            return resolve(fileContent);
        });
    });
    return fileContent;
}