import mongoose from 'mongoose';
import { Schema, model } from 'mongoose'

const conversationSchema = new Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    messages:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default : []
    }],
},{ timestamps: true }
);

const Conversation = model('Conversation', conversationSchema)
export default Conversation