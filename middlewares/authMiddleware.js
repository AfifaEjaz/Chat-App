import jwt from 'jsonwebtoken'
import User from '../user/model.js';

const authMiddleware = async (req, res, next) => {
    try {
        console.log("chla");
        const token = req.cookies.JWT

        console.log("Cookie se mila token",token);

        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded);

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" })
        }

        const user = await User.findById(decoded.userID).select("-password")

        if(!user){
            return res.status(404).json({ error : "User not found"})
        }

        req.user = user
        next()
    }
    catch (error) {
        console.log("Error in Auth Middleware",error.message);
        res.status(500).json({ error : "Internal Server Error"})
    }
}

export default authMiddleware