export class UploadEvolutionRequest {
  name: string;
  evolutionId: number;

  constructor(req: any) {
    this.name = req.name;
    this.evolutionId = req.id;
  }
}