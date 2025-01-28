require('dotenv').config();
const express =require('express');
const app = express();
const urlRouter= require('./routes/url');
const connectToDB = require('./connection/connect')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const URL = require('./models/url')

const PORT=process.env.PORT || 8000;
//connect to db
connectToDB(process.env.MONGO_URL)
//middlewares
app.use(cors());
app.use(cookieParser())
app.use(express.json())
app.use('/url',urlRouter)
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.send('I am connected')
})
//port listening on 4000
app.listen(PORT,()=>{
    console.log(`connected to server on port ${PORT}`)
});

