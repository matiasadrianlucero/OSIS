import { validationResult } from 'express-validator';
import {queryCheckEmailExists} from '../queries/checks/queryCheckEmailExists.js'
import {queryCheckUsernameExists} from '../queries/checks/queryCheckUsernameExists.js'
import { queryRegister } from '../queries/queryRegister.js';
export async function registerUser(req,res){
    const username = req.body.registerUsername;
    const password = req.body.registerPassword;
    const email = req.body.registerEmail;

    const validationErrors = validationResult(req);
    let checkEmail=await queryCheckEmailExists(email)
    let checkUsername=await queryCheckUsernameExists(email)
    if (validationErrors.isEmpty() && checkUsername && checkEmail) {
        queryRegister(username,email,password)
    } 
    // else {
    //     resultsArray.push({ msg: verResult });
    // }

    // return res.render("index", {
    //     title: "Returning to index",
    //     results: resultsArray,
    // });
}