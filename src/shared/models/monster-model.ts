import { Types } from 'mongoose'

interface stats {
  health: number;
  mana: number;
  offense: number;
  defense: number;
  speed: number;
  critRate: number;
}

export class MonsterModel {
  name: string;
  evolution: Types.ObjectId;
  type: Types.ObjectId;
  baseLevel: number;
  baseStats: stats;
  statGain: stats;
}