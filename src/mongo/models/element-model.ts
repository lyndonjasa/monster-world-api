import { model, Schema } from 'mongoose';

const schema = new Schema({
  name: String
});

const Element = model('Element', schema, 'elements');

export default Element;