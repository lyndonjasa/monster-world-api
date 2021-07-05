import { model, Schema, Types } from 'mongoose';

const schema = new Schema({
  evolution: {
    type: Types.ObjectId,
    ref: 'Monster'
  },
  monster: {
    type: Types.ObjectId,
    ref: 'Monster'
  }
});

const EvolutionTree = model('EvolutionTree', schema, 'evolution-trees');

export default EvolutionTree;