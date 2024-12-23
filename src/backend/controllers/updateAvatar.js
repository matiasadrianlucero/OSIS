import { check, validationResult } from 'express-validator';
import {queryCheckEmailExists} from '../queries/checks/queryCheckEmailExists.js'
import { queryUpdateAvatar } from '../queries/update/queryUpdateAvatar.js';
import jwt from 'jsonwebtoken'
import multer from 'multer'

export async function updateAvatar(req,res,next){
    try{
        jwt.verify(req.token, 'osisProject', (err, authorizedData) => {
            if(err){
                res.sendStatus(403)
            } else {
                // const validationErrors = validationResult(req);
                // console.log(authorizedData)
                // if(checkEmail && validationErrors.isEmpty()){
    
                        // const updateEmail = req.body.updateEmail;
                        // const currentEmail = req.body.currentEmail;
                        console.log(req.file.filename,authorizedData.toJWT.email)
                        queryUpdateAvatar(req.file.filename,authorizedData.toJWT.email)
                    
                // }
                // console.log(validationErrors) 
            
                next()
            }
        })
    } catch (err){
        console.log(err)
    }

}