import express from 'express';
import dotenv from 'dotenv';
import DBcon from './db/db.js';
import userRoute from './Routes/userRoute.js';
import passwordRoute from './Routes/passwordRoute.js';
import cors from 'cors';
dotenv.config();
const app = express();
let PORT = process.env.PORT || 5000;//in case of error a safe port provided

app.use(cors());
app.use(express.json());//to parse json data


app.use("/pwm/api/user",userRoute);
app.use("/pwm/api/password",passwordRoute);

DBcon().then(()=>{
    //connect DB then server
    app.listen(PORT, () => {
    console.log(`Server is running`);
});
})
