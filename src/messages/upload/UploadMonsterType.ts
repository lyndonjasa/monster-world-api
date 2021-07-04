export class UploadMonsterType {
  name: string;
  monsterTypeId: number;

  constructor(req: any) {
    this.name = req.name;
    this.monsterTypeId = req.id;
  }
}