import { register } from "controllers/authentication";
import { Router } from "express";

const router = Router();

router.route('/register').post(register);


