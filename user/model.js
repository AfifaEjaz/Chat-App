import mongoose from 'mongoose';
import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/7153/7153150.png"
    }
},{ timestamps: true }
);

const User = model('User', userSchema)
export default User