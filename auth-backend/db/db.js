import { dirname } from "path";
import { fileURLToPath } from "url";
import { writeToFile } from "../services/fileHelper.js";
import db from "./db.json" assert { type: "json" };
const __dirname = dirname(fileURLToPath(import.meta.url));
async function refreshDbJson() {
    await writeToFile(__dirname + "/db.json", db);
}

async function addUser(user) {
    const newUser = { id: db.users.length + 1, ...user };

    db.users.push(newUser);
    await refreshDbJson();

    return newUser;
}

function findUserByEmail(email) {
    return db.users.find((u) => u.email === email);
}

function findUser(email, password) {
    return db.users.find((u) => u.email === email && u.password === password);
}

async function setUserRefreshToken(user, refreshToken, expires) {
    const userIndex = db.users.findIndex(
        (u) => u.email === user.email && u.password === user.password
    );
    db.users[userIndex].refreshToken = refreshToken;
    db.users[userIndex].refreshTokenExpires = expires;
    await refreshDbJson();
}

async function clearUserRefreshToken(user) {
    const userIndex = db.users.findIndex(
        (u) => u.email === user.email && u.password === user.password
    );
    delete db.users[userIndex]?.refreshToken;
    delete db.users[userIndex]?.refreshTokenExpires;
    await refreshDbJson();
}

function getUserByRefreshToken(refreshToken) {
    return db.users.find((u) => u.refreshToken === refreshToken);
}

export default {
    addUser,
    findUserByEmail,
    findUser,
    setUserRefreshToken,
    getUserByRefreshToken,
    clearUserRefreshToken,
};
