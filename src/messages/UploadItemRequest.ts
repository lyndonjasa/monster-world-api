export class UploadItemRequest {
  name: string;
  description: string;
  cost: number;

  constructor(req: any) {
    this.name = req.name;
    this.description = req.description;
    this.cost = req.cost;
  }
}