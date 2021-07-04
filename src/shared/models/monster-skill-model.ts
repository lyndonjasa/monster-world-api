import { Types } from "mongoose";

export class MonsterSkillModel {
  monster: Types.ObjectId;
  skills: Types.ObjectId[];
}