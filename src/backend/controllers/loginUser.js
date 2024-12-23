
import { validationResult } from 'express-validator';
import {queryCheckEmailExists} from '../queries/checks/queryCheckEmailExists.js'

import { queryLogin } from '../queries/queryLogin.js';
export async function loginUser(req,res){
    const password = req.body.loginPassword;
    const email = req.body.loginEmail;

    const validationErrors = validationResult(req);
    let checkEmail=await queryCheckEmailExists(email)
    if (validationErrors.isEmpty() && checkEmail==false) {
        let loginResult =await queryLogin(email,password)

        res.send(loginResult)
    } 
    // else {
    //     resultsArray.push({ msg: verResult });
    // }

    // return res.render("index", {
    //     title: "Returning to index",
    //     results: resultsArray,
    // });
}


