import express from 'express'
import 'dotenv/config'
import cors  from 'cors';
import  {connectDB}  from './db/dbConfig.js';
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
connectDB();

app.listen(port, () => {
    console.log(`server at port ${port}`);
});