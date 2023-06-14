const express = require('express');
const mongoose = require('mongoose');
const app = express();
import { connectDB } from './config/dbConn';
import { getRoutes } from './routes';

connectDB();

app.use(express.json());
app.use('/api', getRoutes());

mongoose.connection.once('open', () => {
  console.log('MongoDB connection OK');
  app.listen(3000, () => console.log('Listening on port 3000'));
});
