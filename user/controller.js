import User from "./model.js";
import { hash, compare, genSalt } from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
    console.log("signup chala");
    const { name, username, password } = req.body;
    console.log(req.body);

    if (!name || !username || !password) {
        return res.status(400).json({ message: "Missing Required Field" });
    }

    try {
        const user = await User.findOne({ username });
        if (user) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Encrypt password
        const salt = await genSalt(10);
        const hashPass = await hash(password, salt);

        // Create a new user
        const newUser = new User({
            name,
            username,
            password: hashPass,
        });
        await newUser.save();

        // Generate JWT Token
        const token = jwt.sign(
            { userID: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '5d' }
        );

        console.log("User Created");

        // Set JWT as HttpOnly cookie
        res.cookie("JWT", token, {
            maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days in milliseconds
            httpOnly: true,
            sameSite: "strict" // Prevent CSRF attacks
        });

        // Respond with success
        return res.status(201).json({
            message: "Signup Successfully",
            token
        });

    } catch (error) {
        console.error("Error during user sign-up:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        // Check if user exists
        if (!user) {
            return res.status(401).json({ message: "You are not a registered user" });
        }

        // Compare password
        const isPasswordValid = await compare(password, user.password);

        // Check if password is valid
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, { expiresIn: '5d' });

        // Store token as Cookie
        res.cookie("JWT", token, {
            maxAge: 5 * 24 * 60 * 60 * 1000, // Set maxAge in milliseconds
            httpOnly: true, // Prevents client-side access to the cookie
            sameSite : "lax",
            secure : process.env.NODE_ENV !== "development"
        });
        console.log("Cookie stored");

        return res.status(200).json({
            message: "Login Successfully",
            token: token
        });
    } catch (error) {
        console.error("Error during user login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getUsers = async(req, res) => {
    try {
        const { _id: userId } = req.user

        const filteredUsers = await User.find({ _id : { $ne : userId}}).select("-password")

        res.status(200).json({users : filteredUsers})

    } catch (error) {
        console.error("Error getting users:", error);
        return res.status(500).json({ message: "Internal server error" });
    } 
}