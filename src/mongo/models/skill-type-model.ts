import { model, Schema } from 'mongoose';

const schema = new Schema({
  name: String,
  typeId: Number
});

const SkillType = model('SkillType', schema, 'skill-types');

export default SkillType;