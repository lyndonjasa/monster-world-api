import { Types } from 'mongoose';

export class StatusModel {
  name: string;
  statusId: number;
  element: Types.ObjectId;
  description: string;
  countdown: string;
}