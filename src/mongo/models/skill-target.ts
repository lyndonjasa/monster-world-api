import { model, Schema } from 'mongoose';

const schema = new Schema({
  name: String,
  targetId: Number
});

const SkillTarget = model('SkillTarget', schema, 'skill-targets');

export default SkillTarget;