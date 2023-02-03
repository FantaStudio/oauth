import * as fs from "fs";

export function writeToFile(path, object) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, JSON.stringify(object), (error) => {
            if (!error) {
                resolve();
            } else {
                reject(error);
            }
        });
    });
}
