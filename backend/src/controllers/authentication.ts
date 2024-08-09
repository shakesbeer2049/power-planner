import express from 'express';
import {createUser, getUserByEmail} from '../controllers/userController';
import {authentication, random} from '../helpers/index';


export const register = async(req:express.Request, res:express.Response) => {
    try {
        const {email, username, password} = req.body;

        if(!email || !username || !password){
            return  res.status(400);
        }

        const userExists = await getUserByEmail(email);

        if (userExists) return res.status(400);

        // create user
        const salt = random();
        const user = await createUser({
            email, username,
            salt,
            authentication:{
                salt,
                password: authentication(salt, password)
            }

        })
        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error);
    }
}