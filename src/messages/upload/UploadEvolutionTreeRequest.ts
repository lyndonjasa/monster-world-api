export class UploadEvolutionTreeRequest {
  name: string;
  evolution: string;

  constructor(req: any) {
    this.name = req.name;
    this.evolution = req.evolution;
  }
}