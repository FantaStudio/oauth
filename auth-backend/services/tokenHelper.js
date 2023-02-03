import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import config from "../config.js";

dotenv.config();

function generateAccessToken(user) {
    const payload = { id: user.id, email: user.email };
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: config.jwtAccessExpiration,
    });

    let expires = new Date();
    expires.setSeconds(expires.getSeconds() + config.jwtAccessExpiration);

    return { accessToken, expires };
}

function generateRefreshToken(user) {
    const payload = { id: user.id, email: user.email };
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: config.jwtRefreshExpiration,
    });

    let expires = new Date();
    expires.setSeconds(expires.getSeconds() + config.jwtRefreshExpiration);

    return { refreshToken, expires };
}

function generateTokens(user) {
    const { accessToken } = generateAccessToken(user);
    const { refreshToken, expires } = generateRefreshToken(user);
    return { accessToken, refreshToken, expires };
}

export default {
    generateAccessToken,
    generateRefreshToken,
    generateTokens,
};
