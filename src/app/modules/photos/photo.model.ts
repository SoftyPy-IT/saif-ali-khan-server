import { model, Schema } from 'mongoose';
import { TPhoto } from './photo.interface';

const photoSchema = new Schema<TPhoto>(
  {
    folder: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

export const Photo = model<TPhoto>('Photo', photoSchema);
