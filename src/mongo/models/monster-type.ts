import { model, Schema } from 'mongoose';

const schema = new Schema({
  name: String,
  monsterTypeId: Number
});

const MonsterType = model('MonsterType', schema, 'monster-types');

export default MonsterType;