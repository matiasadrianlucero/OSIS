import express from 'express'
import cors from 'cors'
import routes from './routes/router.js'
import {PrismaClient} from '@prisma/client'


import {checkTable} from './checkTable.js'
import { check } from 'express-validator'


const prisma = new PrismaClient();
const app = express();
   
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your React app's port
  credentials: true,
  exposedHeaders: 'Authorization',
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // This middleware allows us to parse JSON bodies
app.use(cors());
app.use('/', routes);
app.use(express.static('public'));

checkTable()



app.listen(5174, () => {
  console.log('Server is running on port 5174');
});
