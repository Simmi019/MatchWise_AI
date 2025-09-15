import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';
import fileUpload from 'express-fileupload';
import { indexRoute } from './routers/index.js';
import { Error404 } from './utils/middlewares/404.js';
import { createConnection } from './utils/db/connection.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: ["https://match-wise-ai-yude.vercel.app/", "http://localhost:3000"], // replace with your actual Vercel frontend URL
  methods: ["GET", "POST"],

  credentials: true

}));

app.use(express.json());
app.use(fileUpload({ limits: { fileSize: 5 * 1024 * 1024 } }));

app.get('/', (req, res) => {
  res.send('✅ Backend is running successfully!');
});

app.use('/routers', indexRoute);
app.use(Error404);

const promise = createConnection();
const PORT = process.env.PORT || 5500;   

promise.then(() => {
  console.log(chalk.green('DB Connected'));
  app.listen(PORT, () => {
    console.log(chalk.greenBright.bold(`Server running on port ${PORT}...`));
  });
}).catch(err => {
  console.log(chalk.redBright(' DB Connection Failed'), err);
});
