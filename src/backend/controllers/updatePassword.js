import { check, validationResult } from 'express-validator';
import { queryUpdatePassword } from '../queries/update/queryUpdatePassword.js';
import jwt from 'jsonwebtoken'

export async function updatePassword(req,res){
    jwt.verify(req.token, 'osisProject', (err, authorizedData) => {
        if(err){
            res.sendStatus(403)
        } else {
            const validationErrors = validationResult(req);
            
            if(validationErrors.isEmpty()){
                console.log("No errors found in query")
                jwt.verify(req.token, 'osisProject', (err, authorizedData) => {
                    queryUpdatePassword(req.body.updatePasswordUpdate,req.body.updatePasswordCurrent,authorizedData.toJWT.email)
                })
            }        
        }
    })

}