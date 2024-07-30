import mongoose from "mongoose";
import { MONGO_DB_URL } from "./constants.mjs";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_DB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
