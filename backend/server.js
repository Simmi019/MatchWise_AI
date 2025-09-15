// import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';
import fileUpload from 'express-fileupload';
import { indexRoute } from './routers/index.js';
import { Error404 } from './utils/middlewares/404.js';
import { createConnection } from './utils/db/connection.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload({ limits: { fileSize: 5 * 1024 * 1024 } }));

// Routes
app.get('/', (req, res) => {
  res.send('✅ Backend is running successfully!');
});
app.use('/routers', indexRoute);
app.use(Error404);

// Database + Server
const PORT = process.env.PORT || 5500;

createConnection()
  .then(() => {
    console.log(chalk.green('DB Connected'));
    app.listen(PORT, () => {
      console.log(chalk.greenBright.bold(`Server running on port ${PORT}...`));
    });
  })
  .catch(err => {
    console.log(chalk.redBright('DB Connection Failed'), err);
  });
