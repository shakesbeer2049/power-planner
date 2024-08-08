import express from 'express';
import {getUserByEmail} from '../controllers/userController';
import {random} from '../helpers/index';


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

    } catch (error) {
        console.log(error);
    }
}