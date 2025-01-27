import mongoose from 'mongoose';
import Conversation from "../conversation/model.js";
import Message from './model.js';

export const sendMessage = async (req, res) => {
    const { id: receiverId } = req.params; // Extract receiverId from the request parameters
    const { _id: senderId } = req.user; // Extract senderId from the user (assumed to be added by authentication middleware)
    const { message } = req.body; // Extract message from request body


    console.log("Receiver ObjectId:", receiverId);
    console.log("Sender ObjectId:", senderId);
    console.log("Message:", message);

    try {
        // Check if a conversation exists between sender and receiver
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        console.log("Existing Conversation:", conversation);

        // If no conversation exists, create one
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        // Create and save a new message
        const newMessage = await new Message({
            senderId,
            receiverId,
            message
        }).save();

        // Add message ID to the conversation and save the conversation
        conversation.messages.push(newMessage._id);
        await conversation.save();

        // Send response
        res.status(201).json({ message: "Message Sent Successfully", newMessage });
    } catch (error) {
        console.error("Error Sending Message:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const { _id: senderId } = req.user

        const conversation = await Conversation.findOne({
            participants: [senderId, userToChatId]
        }).populate('messages')

        if(!conversation) {
            return res.status(200).json([])
        }

        res.status(200).json({
            messages: conversation.messages
        })

    } catch (error) {
        console.log("Error getting messages", error.message);
        res.status(500).json("Internal Server Error", error)
    }
}