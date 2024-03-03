import mongoose from "mongoose";

// define the mongodb connection url
// for Local
// const mongoURL = "mongodb://localhost:27017/hotels";


//setup  mongodb connection
// mongoose.connect(mongoURL)

// export const db = mongoose.connection;

// db.on("connected", ()=>{
//     console.log("mongodb connected to server");
// })
// db.on("error", (err)=>{
//     console.error("mongodb connecttion error", err);
// })
// db.on("disconnected", ()=>{
//     console.log("mongodb disconnected to server");
// })

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URL_CLOUD)
      console.log("MongoDB Connected to server")
    } catch (error) {
      console.log(`MongoDB Error: ${error}`)
    }
  }
  
  export default connectDB