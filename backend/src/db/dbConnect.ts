
import mongoose from "mongoose";
import { dbName, dbURL } from "../constants/dbCredentials";

const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${dbURL}/${dbName}`);
        console.log(`connected to database ${dbName}: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Error: ",error);
        process.exit(1);
    }
};

export default connectDB;

