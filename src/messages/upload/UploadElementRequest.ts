export class UploadElementRequest {
  name: string;

  constructor(req: any) {
    this.name = req.element;
  }
}