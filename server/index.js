import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/connectDb.js"
const app = express()
dotenv.config()

app.get("/",(req,res)=>{
    return res.send({message:"Server Started"})
})
const PORT = process.env.PORT|| 6000
app.listen(PORT, ()=>{
    console.log(`Server Running at ${PORT}`);
    connectDb()
})