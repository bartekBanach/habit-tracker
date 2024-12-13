import mongoose from 'mongoose';
import { Schema, Model, Types } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUserPreferences {
  timersOrder?: string[];
}

interface IUser {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  userPreferences: IUserPreferences;
}

interface IUserMethods {
  matchPasswords(enteredPassword: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userPreferences: {
    type: {
      timersOrder: { type: [String], default: [] },
    },
    default: {},
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPasswords = async function (enteredPassowrd: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassowrd, this.password);
};

const User = mongoose.model<IUser, UserModel>('User', userSchema);

export default User;
export { IUser };
