import mongoose, { Schema, Document } from 'mongoose';
import { usersMongoUrl } from '../../connection/connectDatabase';
mongoose.connect(usersMongoUrl);

interface User extends Document {
  email: string;
  password: string;
  active: boolean;
}

const UserSchema = new Schema<User>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  active: { type: Boolean, required: false },
});

export const UserModel = mongoose.model<User>('User', UserSchema);
