import 'dotenv/config';
import express from 'express';
import userRouter from './routes/user.route.js';
import { errorHandler } from './libs/middleware.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import cldRouter from './routes/cloudinary.route.js';
import taskRouter from './routes/task.route.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(
    cors({
        origin: [
            process.env.CLIENT_URL, 
            "http://localhost:3000" // Allow local frontend during development
        ],
        methods: "GET, POST, PUT, DELETE, OPTIONS",
        allowedHeaders: "Content-Type, Authorization",
        credentials: true,
    })
);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/image', cldRouter);
app.use('/api/v1/tasks', taskRouter);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Taskly API' });
})
app.use('*', (req, res) => {
    res.status(404).json({ message: 'not found' });
});

app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`)
});

