const express = require('express');
const mongoose = require('mongoose');
const app = express();
import { connectDB } from './config/dbConn';
import { getRoutes } from './routes';
const Member = require('./model/Member');

connectDB();

app.use(express.json());
app.use('/api', getRoutes());

mongoose.connection.once('open', () => {
  console.log('kapcs');
  app.listen(3000, () => console.log('Listening on port 3000'));
});
