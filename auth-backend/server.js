import jsonServer from "json-server";
import loginValidation from "../utils/validation/loginValidation.js";
import db from "./db/db.js";
import jwtMiddleware from "./jwtMiddleware.js";
import tokenHelper from "./services/tokenHelper.js";
import userValidation from "./services/userValidation.js";

// настройки сервера
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 5000;

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Маршруты
server.post("/api/user/signUp", async (req, res) => {
    try {
        const validatedUser = await userValidation.validate(req.body);
        const newUser = await db.addUser(validatedUser);

        res.status(200).json(newUser);
    } catch (e) {
        if (e?.name === "ValidationError") {
            res.status(400).json({
                field: e.path,
                message: e.message,
            });
        } else {
            res.status(500).json(e);
        }
    }
});

server.post("/api/user/login", async (req, res) => {
    try {
        const validatedUser = await loginValidation.validate(req.body);
        const currentUser = db.findUser(
            validatedUser.email,
            validatedUser.password
        );
        if (!currentUser) {
            return res.status(400).json({
                message: "Неправильный email или пароль",
            });
        }
        const { accessToken, refreshToken, expires } =
            tokenHelper.generateTokens(currentUser);

        await db.setUserRefreshToken(currentUser, refreshToken, expires);

        res.status(200).json({
            email: currentUser.email,
            username: currentUser.username,
            accessToken: accessToken,
            refreshToken: refreshToken,
        });
    } catch (e) {
        if (e?.name === "ValidationError") {
            res.status(400).json({
                field: e.path,
                message: e.message,
            });
        } else {
            res.status(500).jsonp(e);
        }
    }
});

server.post("/api/user/checkEmail", async (req, res) => {
    try {
        const email = req?.body?.email;
        if (!email) {
            return res.status(400).json({
                message: "please, enter email",
            });
        }
        const isExist = !!db.findUserByEmail(email);
        res.status(200).json(isExist);
    } catch (e) {
        res.status(500).json(e);
    }
});

server.post("/api/user/refreshToken", async (req, res) => {
    try {
        const refreshToken = req?.body?.refreshToken;
        if (!refreshToken) {
            return res.status(403).json({
                message: "Refresh Token is required!",
            });
        }

        const user = db.getUserByRefreshToken(refreshToken);
        if (!user) {
            return res.status(403).json({
                message: "this refresh token doesn't exist",
            });
        }

        if (
            user.refreshTokenExpires &&
            new Date(user.refreshTokenExpires).getTime() < new Date().getTime()
        ) {
            db.clearUserRefreshToken(user);
            return res.status(403).json({
                message:
                    "Refresh token was expired. Please make a new login request",
            });
        }

        const accessToken = tokenHelper.generateAccessToken({
            id: user.id,
            email: user.email,
        });
        res.status(200).json(accessToken);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

server.get("/api/user/test", jwtMiddleware, async (req, res) => {
    try {
        res.status(200).json();
    } catch (err) {
        res.status(403).json({
            message: "Пользователь не авторизован",
        });
    }
});

server.listen(port, () => {
    console.log("Oauth Backend has been started");
});
