import express from 'express';
import {Router} from 'express'
import { query } from 'express-validator';
import {registerUser} from '../controllers/registerUser.js'
import {loginUser} from '../controllers/loginUser.js'
import {updateEmail} from '../controllers/updateEmail.js'
import {updateUsername} from '../controllers/updateUsername.js'

import {body} from 'express-validator'
import { updatePassword } from '../controllers/updatePassword.js';
import {updateAvatar} from '../controllers/updateAvatar.js'
import {createPost} from  '../controllers/createPost.js'

import { selectFolder } from './selectFolder.js';
const router = Router();

import multer from 'multer'

let upload
let uploadPosts 
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'./src/backend/imgs/avatars')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = file.originalname.split('.')[1]
    cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`)
  }
})
let storagePosts = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'./src/backend/imgs/posts/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = file.originalname.split('.')[1]
    cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`)
  }
})
upload=multer({storage})
uploadPosts=multer({storagePosts})
router.post('/register',
    body('registerUsername').trim().notEmpty().withMessage("A username must be entered."),
    body('registerEmail').notEmpty().withMessage("An email must be entered").isEmail().trim().withMessage("Incorrect email formating."),
    body('registerPassword').notEmpty().withMessage("A password must be entered").isLength({min:2}).withMessage("Password must be at least 6 characters long."),
    registerUser
);
router.post('/login',
    body('loginEmail').notEmpty().withMessage("An email must be entered").isEmail().trim().withMessage("Incorrect email formating."),
    body('loginPassword').notEmpty().withMessage("A password must be entered"),
    loginUser
);
router.post('/update/Email',
    body('updateEmail').notEmpty().withMessage("An email must be entered").isEmail().trim().withMessage("Incorrect email formating."),
    verifyToken,
    updateEmail
);
router.post('/update/Username',
  body('updateUsername').trim().notEmpty().withMessage("A username must be entered."),
  verifyToken,
  updateUsername
);
router.post('/update/Password',
  body('updatePasswordUpdate').notEmpty().withMessage("A password must be entered").isLength({min:2}).withMessage("Password must be at least 2 characters long."),
  body('updatePasswordCurrent').notEmpty().withMessage("A password must be entered").isLength({min:2}).withMessage("Password must be at least 2 characters long."),
  verifyToken,
  updatePassword
);
router.post('/update/Avatar',
  verifyToken,
  upload.single('updateAvatarFile'),
  updateAvatar,
);
router.post('/create/Post',
  verifyToken,
  (req,res,next)=>{
    console.log(req.body,req.file)
    next()
  },
  uploadPosts.single('postImg'),
  // selectFolder,
  (req,res,next)=>{
    res.sendStatus(200)
  }

);
router.get('/avatar/:name', function (req, res) {
  const avatar = req.params.name;
  res.sendFile('./imgs/avatars/'+ avatar, { root: './src/backend/' });
});

function verifyToken(req,res,next){
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
    req.token = bearerHeader;

    next()
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}
export default router;
 