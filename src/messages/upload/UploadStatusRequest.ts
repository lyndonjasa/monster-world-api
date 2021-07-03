export class UploadStatusRequest {
  status: string;
  element: string;
  description: string;
  countdown: string;

  constructor(req: any) {
    this.status = req.status;
    this.element = req.element;
    this.description = req.description;
    this.countdown = req.countdown;
  }
}