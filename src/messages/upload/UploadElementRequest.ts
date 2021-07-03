export class UploadElementRequest {
  _id: number;
  name: string;

  constructor(req: any) {
    this._id = req._id;
    this.name = req.element;
  }
}