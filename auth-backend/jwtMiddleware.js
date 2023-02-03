import jwt from "jsonwebtoken";
import config from "./config.js";
const { TokenExpiredError } = jwt;

const jwtMiddleware = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, config.jwtAccess, (err, decoded) => {
        if (err) {
            if (err instanceof TokenExpiredError) {
                return res.status(401).send({
                    message: "Unauthorized! Access Token was expired!",
                });
            } else {
                return res.sendStatus(401).send({ message: "Unauthorized!" });
            }
        }
        req.userId = decoded.id;
        next();
    });
};

export default jwtMiddleware;
