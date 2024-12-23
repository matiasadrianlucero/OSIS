import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken'
import { queryCreatePost } from '../queries/queryCreatePost.js';


export function createPost(req,res){
    try{
        jwt.verify(req.token, 'osisProject', (err, authorizedData) => {
            if(err){
                res.sendStatus(403)
            } else {
                // const validationErrors = validationResult(req);
                console.log(authorizedData)
                // if(validationErrors.isEmpty()){
                    jwt.verify(req.token, 'osisProject', (err, authorizedData) => {
                        console.log("athorzed:  " + authorizedData.toJWT.id,req.body.postText,req.file.filename)
                        queryCreatePost(req.body.postText,req.file.filename,authorizedData.toJWT.id)
                    })
                // }

            
                res.sendStatus(200)
            }
        })
    } catch(e){
        console.log(e)
    }

}