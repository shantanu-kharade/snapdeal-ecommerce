import express from 'express';
import 'dotenv/config';
import cors from 'cors'
import connectDB from './db/dbConfig.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import authRouter from './routes/authRoutes.js';


// Express app
const app = express();
const port = process.env.port || 3000;
app.use(cors());

// Body parser
app.use(express.json());


// MongoDB connection
connectDB();

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);


// Error handling if no route is found
app.use((req, res, next) => {
    res.status(404).send({ message: 'page not found' });
})

// Middleware to handle errors
app.use((err, req, res, next) => {
    res.status(500).send({ message: 'server error' });
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
})

// Start server
app.listen(port, () => {
    console.log(`server at port ${port}`);
});