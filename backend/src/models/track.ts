import mongoose, { Document, Model, Schema } from 'mongoose';
import { z } from 'zod';

type IPoint = Document & {
  timestamp: number;
  coords: {
    latitude: number;
    longitude: number;
    altitude: number;
    accuracy: number;
    heading: number;
    speed: number;
  };
}

type ITrack = Document & {
  userId: mongoose.Schema.Types.ObjectId;
  name: string;
  locations: IPoint[];
}

const pointSchema: Schema<IPoint> = new Schema({
  timestamp: {
    type: Number,
    required: true
  },
  coords: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    altitude: {
      type: Number,
      required: true
    },
    accuracy: {
      type: Number,
      required: true
    },
    heading: {
      type: Number,
      required: true
    },
    speed: {
      type: Number,
      required: true
    }
  }
});

const trackSchema: Schema<ITrack> = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    default: ''
  },
  locations: [pointSchema]
});

export const ZodTrackSchema = z.object({
  userId: z.string(),
  name: z.string(),
  locations: z.array(z.object({
    timestamp: z.number(),
    coords: z.object({
      latitude: z.number(),
      longitude: z.number(),
      altitude: z.number(),
      accuracy: z.number(),
      heading: z.number(),
      speed: z.number()
    })
  })),
});

export type Track = z.infer<typeof ZodTrackSchema>;

export const Track: Model<ITrack> = mongoose.model<ITrack>('Track', trackSchema);
