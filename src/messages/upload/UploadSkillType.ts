export class UploadSkillType {
  name: string;
  typeId: number;

  constructor(req: any) {
    this.name = req.name;
    this.typeId = req.id;
  }
}