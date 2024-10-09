import mongoose, { Document, Model, Schema } from 'mongoose';

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

export const Track: Model<ITrack> = mongoose.model<ITrack>('Track', trackSchema);
