import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./constants.js";

export const tokenSign = (user) => {
    const _sign = jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );
    return _sign;
}

export const verifyToken = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET);
    } catch (error) {
        return null;
    }
}