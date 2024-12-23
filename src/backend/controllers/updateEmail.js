import { check, validationResult } from 'express-validator';
import {queryCheckEmailExists} from '../queries/checks/queryCheckEmailExists.js'
import { queryUpdateEmail } from '../queries/update/queryUpdateEmail.js';

import jwt from 'jsonwebtoken'

export async function updateEmail(req,res){
    let checkEmail= await queryCheckEmailExists(req.body.updateEmail)
    jwt.verify(req.token, 'osisProject', (err, authorizedData) => {
        if(err){
            res.sendStatus(403)
        } else {
            const validationErrors = validationResult(req);
            console.log(authorizedData)
            if(checkEmail && validationErrors.isEmpty()){
                jwt.verify(req.token, 'osisProject', (err, authorizedData) => {
                    console.log("athorzed:  " + authorizedData)
        
                    // const updateEmail = req.body.updateEmail;
                    // const currentEmail = req.body.currentEmail;
            
                    queryUpdateEmail(req.body.updateEmail,authorizedData.toJWT.email)
                })
            }
            console.log(validationErrors) 
        
        
        }
    })

}