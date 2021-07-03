export class UploadStatusRequest {
  status: string;
  statusId: number;
  element: string;
  description: string;
  countdown: string;

  constructor(req: any) {
    this.status = req.status;
    this.statusId = req._id;
    this.element = req.element;
    this.description = req.description;
    this.countdown = req.countdown;
  }
}