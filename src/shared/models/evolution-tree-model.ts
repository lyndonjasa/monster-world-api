import { Types } from 'mongoose'

export class EvolutionTreeModel {
  monster: Types.ObjectId;
  evolution: Types.ObjectId;
}