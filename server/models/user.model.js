import mongoose from "mongoose";
 
const UserSchema = mongoose.Schema({
    name :{
      type:String,
      required:true
    },
    email:{
    type:String,
    required:true,
    unique:true
    },
    credits:{
        type:Number,
        default:100
    }
},{timestamps:true})

const User = mongoose.model("User",UserSchema)

export default User
