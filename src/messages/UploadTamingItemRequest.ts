interface Rate {
  rookie: number;
  champion: number;
  ultimate: number;
  mega: number;
  ultra: number;
}

export class UploadTamingItemRequest {
  name: string;
  catchRate: Rate;
  monsterType: number;

  constructor(req: any) {
    this.name = req.name;
    this.catchRate = req.catchRate;
    this.monsterType = req.monsterType;
  }
}