import express from 'express'
import { UploadItemRequest } from '../messages/UploadItemRequest';
import { UploadTamingItemRequest } from '../messages/UploadTamingItemRequest';
import UploadService from '../services/upload-service';

const UploadRouter = express.Router();

UploadRouter.post('/upload/items', async(req, res) => {
  const request: any[] = req.body;
  const items = request.map(r => new UploadItemRequest(r));
  
  try {
    const response = await UploadService.uploadItems(items);

    res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

UploadRouter.post('/upload/taming-items', async(req, res) => {
  const request: any[] = req.body;
  const items = request.map(r => new UploadTamingItemRequest(r));

  try {
    const response = await UploadService.uploadTamingItems(items);

    res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default UploadRouter;