import bcrypt from 'bcrypt';
import mongoose, { Document, Model, Schema } from 'mongoose';
import { z } from "zod";

export type IUser = Document & {
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre<IUser>('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
  const user = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }

      if (!isMatch) {
        return reject(false);
      }

      resolve(true);
    });
  });
};

export const UserSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
