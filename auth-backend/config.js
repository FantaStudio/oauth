import dotenv from "dotenv";
dotenv.config();

export default {
    jwtAccessExpiration: 60, //3600
    jwtRefreshExpiration: 300,
    jwtAccess: process.env.JWT_ACCESS_SECRET,
    jwtRefresh: process.env.JWT_REFRESH_SECRET,
};
