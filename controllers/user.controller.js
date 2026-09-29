import userModel from '../models/user.model.js';
import userService from "../services/user.service.js";
import {validationResult} from 'express-validator'

export const createUserController = async (req,res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
    }

    try{
        const user = await userService.createUser(req.body);

        const token = await user.generateJWT();

        res.status(201).josn({user,token})
    }catch(error){
        res.status(500).send({error: error.messaeg})
    }

}
