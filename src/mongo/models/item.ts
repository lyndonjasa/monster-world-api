import { model, Schema } from 'mongoose';

const schema = new Schema({
  name: String,
  description: String,
  cost: Number
});

const Item = model('Item', schema, 'items');

export default Item;