import { model, Schema, Types } from 'mongoose';

const schema = new Schema({
  monster: {
    type: Types.ObjectId,
    ref: 'Monster'
  },
  skills: [{
    type: Types.ObjectId,
    ref: 'Skill'
  }]
});

const MonsterSkill = model('MonsterSkill', schema, 'monster-skills');

export default MonsterSkill;