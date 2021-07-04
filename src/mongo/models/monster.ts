import { model, Schema, Types } from 'mongoose';

const schema = new Schema({
  name: String,
  evolution: {
    type: Types.ObjectId,
    ref: 'Evolution'
  },
  type: {
    type: Types.ObjectId,
    ref: 'MonsterType'
  },
  baseLevel: Number,
  baseStats: {
    health: Number,
    mana: Number,
    offense: Number,
    defense: Number,
    speed: Number,
    critRate: Number
  },
  statGain: {
    health: Number,
    mana: Number,
    offense: Number,
    defense: Number,
    speed: Number,
    critRate: Number
  }
});

const Monster = model('Monster', schema, 'monsters');

export default Monster;