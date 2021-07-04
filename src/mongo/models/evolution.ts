import { model, Schema } from 'mongoose';

const schema = new Schema({
  name: String,
  evolutionId: Number
});

const Evolution = model('Evolution', schema, 'evolutions');

export default Evolution;