import { model, Schema, Types } from 'mongoose';

const schema = new Schema({
  itemId: {
    type: Types.ObjectId,
    ref: 'Item'
  },
  catchRate: {
    rookie: Number,
    champion: Number,
    ultimate: Number,
    mega: Number,
    ultra: Number
  }
});

const TamingItem = model('TamingItem', schema, 'taming-items');

export default TamingItem;