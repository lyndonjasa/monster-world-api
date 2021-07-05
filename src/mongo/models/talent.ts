import { model, Schema } from 'mongoose';

const schema = new Schema({
  category: String,
  name: String,
  effectDescription: String,
  talentPoints: Number,
  talentId: Number
});

const Talent = model('Talent', schema, 'talents');

export default Talent;