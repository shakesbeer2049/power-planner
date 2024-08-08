import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username : {type: String, required : true},
    password : {type: String, required : true},
    authentication : {
        password : {type : String, required: true, select : false},
        salt : {type: String, select: false},
        sessionToken : {type: String, select: false}
    }
})

export const UserModel = mongoose.model("User", UserSchema);