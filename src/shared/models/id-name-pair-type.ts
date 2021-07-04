import { Types } from 'mongoose'

export type idNamePair = {
  _id: Types.ObjectId,
  name: string;
};