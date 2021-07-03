import express from 'express'
import { UploadElementRequest } from '../messages/upload/UploadElementRequest';
import { UploadItemRequest } from '../messages/upload/UploadItemRequest';
import { UploadStatusRequest } from '../messages/upload/UploadStatusRequest';
import { UploadTamingItemRequest } from '../messages/upload/UploadTamingItemRequest';
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

UploadRouter.post('/upload/elements', async(req, res) => {
  const request: any[] = req.body;
  const elements = request.map(r => new UploadElementRequest(r));

  try {
    const response = await UploadService.uploadElements(elements);

    res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

UploadRouter.post('/upload/status', async(req, res) => {
  const request: any[] = req.body;
  const status = request.map(r => new UploadStatusRequest(r));

  try {
    const response = await UploadService.uploadStatus(status);

    res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default UploadRouter;