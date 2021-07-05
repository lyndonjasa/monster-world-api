import './mongo/setup';
import cors from 'cors';
import config from './shared/config';
import express from 'express';
import routes from './routes/all-routes'

import dotenv from 'dotenv'
dotenv.config();

console.log(process.env);

const app = express();
app.use(cors());
app.use(express.json());

routes.forEach(r => {
  app.use(r);
});

app.get("/", (req, res) => {
  res.send("Monster World API " + config.environment);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("server listening to port: " + port);
});