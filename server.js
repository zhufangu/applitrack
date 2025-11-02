import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan'; // HTTP request logger middleware for node.js
import mongoose from 'mongoose';
// routers
import jobRouter from './routers/jobRouter.js';

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json()); // invokes the JSON parser for all incoming requests

app.get('/', (req, res) => {
  // means when we hit the root URL, we will get the response
  res.send('Hello World'); // response will be Hello World
});

app.post('/', (req, res) => {
  console.log(req);
  res.json({ message: 'Data received', data: req.body }); // // General status message; the data is stored in req.body
});

app.use('/api/v1/jobs', jobRouter);

app.use('*', (req, res) => {
  // if the route is not found; * means everything
  res.status(404).json({ msg: 'not found' });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: 'something went wrong' });
});

const port = process.env.PORT || 5100; // if it exists, use the port from the environment variable, otherwise use 5100

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    // server will run on port 5100
    console.log(`Server is running on PORT ${port}...`); // message to confirm the server is running
  });
} catch (error) {
  console.log(error);
  process.exit(1); // exit the process with a failure code
}
