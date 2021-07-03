import express from 'express';
import Status from '../mongo/models/status-model';

const StatusRouter = express.Router();

StatusRouter.get('/status', async (req, res) => {
  const status = await Status.find().populate('element', 'name -_id');

  res.send(status);
});

export default StatusRouter;