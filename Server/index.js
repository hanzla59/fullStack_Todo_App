const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require("./Middleware/errorHandler");
const router = require("./Routes/route");
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: '*',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
));

mongoose.connect('mongodb://localhost:27017/fullStack_Todo_App').then(() => {
    console.log("Databse Connected Successfully")
}).catch((error) => {
    console.error(error);
})

app.use(router)
app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`Backend Work on ${PORT}`)
})