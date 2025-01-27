import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to Database");
    } catch (error) {
        console.log("Error Connecting DB", error.message);
    }
}

export default connectDB