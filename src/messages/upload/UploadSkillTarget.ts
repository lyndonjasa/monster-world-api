export class UplaodSkillTarget {
  name: string;
  targetId: number;

  constructor(req: any) {
    this.name = req.name;
    this.targetId = req.id;
  }
}