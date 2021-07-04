import { model, Schema, Types } from 'mongoose';

const schema = new Schema({
  name: String,
  element: {
    type: Types.ObjectId,
    ref: 'Element'
  },
  cost: Number,
  power: Number,
  skillType: {
    type: Types.ObjectId,
    ref: 'SkillType'
  },
  skillTarget: {
    type: Types.ObjectId,
    ref: 'SkillTarget'
  },
  description: String,
  ignoreDefense: Boolean,
  hasStatusEffect: Boolean,
  status: {
    effect: {
      type: Types.ObjectId,
      ref: 'Status'
    },
    target: {
      type: Types.ObjectId,
      ref: 'SkillTarget'
    },
    chance: Number,
    turns: Number
  },
  hasPenalty: Boolean,
  penalty: {
    damage: Number,
    target: {
      type: Types.ObjectId,
      ref: 'SkillTarget'
    }
  }
});

const Skill = model('Skill', schema, 'skills');

export default Skill;