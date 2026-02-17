import jwt from 'jsonwebtoken';
import 'dotenv/config';
const allowdRoles = ['admin'];
const authenticateToken = (req, res, next) => {
    const btoken = req.headers['authorization'];
    console.log("btoken", btoken);

    if (!btoken) {
        return res.status(401).send('Unauthorized user');
    }

    const token = btoken.trim().replace(/^bearer\s+/i, '');
    console.log("token", token);

    try {
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = verified;
        return true;
    } catch (error) {
        console.error('JWT verification error:', error);
        res.status(401).json({ message: "Invalid Token" });

    }
}

const authorizeRole = (allowdRoles) => {
    return (res, req, next) => {
        const userRole = req.body.role;
        if (!allowdRoles.includes(userRole)) {
            return res.status(403).send('forbidden user');
        }
        next();
    }
}

export {
    authenticateToken,
    authorizeRole
}