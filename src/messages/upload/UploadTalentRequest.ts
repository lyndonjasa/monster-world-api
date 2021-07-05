export class UploadTalentRequest {
  category: string;
  name: string;
  effectDescription: string;
  talentPoints: number;
  talentId: number;
  
  constructor(req: any) {
    this.category = req.category;
    this.name = req.name;
    this.effectDescription = req.effect;
    this.talentPoints = req.talentPoints;
    this.talentId = req.talentId;
  }
}