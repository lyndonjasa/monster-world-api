import { model, Schema, Types } from 'mongoose';

const schema = new Schema({
  name: String,
  element: {
    type: Types.ObjectId,
    ref: 'Element'
  },
  description: String,
  countdown: String
});

const Status = model('Status', schema, 'status');

export default Status;