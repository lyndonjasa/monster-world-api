export class UploadMonsterSkillRequest {
  monster: string;
  skills: string[];

  constructor(req: any) {
    this.monster = req.monster;
    this.skills = req.skills;
  }
}