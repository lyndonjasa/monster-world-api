import { Types } from 'mongoose'

export class SkillModel {
  name: string;
  element: Types.ObjectId;
  cost: number;
  power: number;
  skillType: Types.ObjectId;
  skillTarget: Types.ObjectId;
  description: string;
  ignoreDefense: boolean;
  hasStatusEffect: boolean;
  status: {
    effect: Types.ObjectId;
    target: Types.ObjectId;
    chance: number;
    turns: number;
  }
  hasPenalty: boolean;
  penalty: {
    damage: number;
    target: Types.ObjectId;
  }
}