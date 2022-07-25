import mongoose from "mongoose"

const {Schema, model} = mongoose

//Structure of our database in MongoDB
const userSchema = new Schema({
    userName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
        type: String,
        required: true
        },  
})

export const UserModel = model("User_DB", userSchema)


