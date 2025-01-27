import mongoose from 'mongoose';
import { Schema, model } from 'mongoose'

const messageSchema = new Schema({
   senderId: {
    type : mongoose.Schema.Types.ObjectId,
    required : true
   },
   receiverId : {
    type : mongoose.Schema.Types.ObjectId,
    required : true
   },
   message : {
    type : String,
    required : true
   }
},{ timestamps: true }
);

const Message = model('Message', messageSchema)
export default Message