import { check, validationResult } from 'express-validator';
import {queryCheckUsernameExists} from '../queries/checks/queryCheckUsernameExists.js'
import { queryUpdateUsername } from '../queries/update/queryUpdateUsername.js';

import jwt from 'jsonwebtoken'

export async function updateUsername(req,res){
    let checkUsername= await queryCheckUsernameExists(req.body.updateUsername)
    jwt.verify(req.token, 'osisProject', (err, authorizedData) => {
        if(err){
            res.sendStatus(403)
        } else {
            const validationErrors = validationResult(req);
            
            if(checkUsername && validationErrors.isEmpty()){
                console.log("no errors")
                jwt.verify(req.token, 'osisProject', (err, authorizedData) => {
                    queryUpdateUsername(req.body.updateUsername,authorizedData.toJWT.username)
                })
            }        
            return validationErrors
        }
    })

}