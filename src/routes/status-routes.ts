import express from 'express';
import Status from '../mongo/models/status-model';

const StatusRouter = express.Router();

StatusRouter.get('/status', async (req, res) => {
  const status = await Status.find().populate('element', 'name elementId -_id');

  res.send(status);
});

StatusRouter.get('/status/:id', async (req, res) => {
  const id = req.params.id;

  const status = await Status.findById(id).populate('element', 'name elementId -_id');
  if (status) {
    res.send(status);
  } else {
    res.status(404).send();
  }
});

export default StatusRouter;