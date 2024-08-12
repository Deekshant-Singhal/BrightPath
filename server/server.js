import express from 'express';
import dotenv from "dotenv";
import { CONNECT } from './controllers/dbControllers/dbconnectController.js';
import authRoutes from './routes/authRoutes.js'
import userTypeRoute from './routes/userTypeRoute.js'

dotenv.config();

CONNECT();

const app = express();
app.use(express.json());


const PORT = process.env.PORT;



app.use(authRoutes);

app.use(userTypeRoute);

app.get('/',(req,res)=>{
res.send("hello");
});

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
})