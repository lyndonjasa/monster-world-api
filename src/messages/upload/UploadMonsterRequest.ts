interface stats {
  health: number;
  mana: number;
  offense: number;
  defense: number;
  speed: number;
  critRate: number;
}

export class UploadMonsterRequest {
  name: string;
  evolution: string;
  type: string;
  baseLevel: number;
  baseStats: stats;
  statGain: stats;

  constructor(req: any) {
    this.name = req.name;
    this.evolution = req.evolution;
    this.baseLevel = req.baseLevel;
    this.type = req.monsterType;

    this.baseStats = {
      health: req.baseStats.health,
      mana: req.baseStats.mana,
      offense: req.baseStats.offense,
      defense: req.baseStats.defense,
      speed: req.baseStats.speed,
      critRate: req.baseStats.critRate
    }

    this.statGain = {
      health: req.statGain.health,
      mana: req.statGain.mana,
      offense: req.statGain.offense,
      defense: req.statGain.defense,
      speed: req.statGain.speed,
      critRate: req.statGain.critRate
    }
  }
}