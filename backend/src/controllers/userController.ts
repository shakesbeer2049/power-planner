import { UserModel } from "models/Users";


export const getUsers = () => {
    return UserModel.find();
}

export const getUserByEmail = (email : string) => {
    return UserModel.findOne({email});
}

export const getUserById = (id : string) => {
    return UserModel.findById(id);
}

export const getUserBySessionToken = (sessionToken : string) => {
    return UserModel.findOne({'authenticate.sessionToken': sessionToken});
}

export const createUser = async(values:Record <string, any>) => {
   let user = await new UserModel(values).save();
   const newUser = user.toObject();
}

export const deleteUserById = (id: string) => {
    UserModel.findByIdAndDelete({_id : id});
}

export const updateUserById = (id: string, values:Record <string, any>) => {
    UserModel.findByIdAndUpdate(id, values);
}