import mongoose, { mongo } from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on("connected", ()=>{
            console.log("MongoDB database connection established successfully");
        })

        connection.on("error", (err)=>{
            console.log("MongoDB database connection failed", err);
            process.exit();
        })

    }
    catch(err){
        console.log("Something went wrong while connecting to Database");
        console.log(err);
    }
}