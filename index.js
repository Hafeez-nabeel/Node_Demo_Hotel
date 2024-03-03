import express from "express";
import dotenv from "dotenv";
// import { db } from "./db.js";
import connectDB from "./db.js"
import bodyParser from "body-parser";
import {personRoute} from "./routes/personRoute.js";
import { menuItemRout } from "./routes/menuItemRoute.js";

dotenv.config()
connectDB()
const app = express();
app.use(bodyParser.json());
app.use("/person", personRoute)
app.use("/menuitem", menuItemRout)
const PORT = process.env.PORT || 3000
app.get("/", (req, res)=>{
res.send("Welcome to world's best hotel")
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
