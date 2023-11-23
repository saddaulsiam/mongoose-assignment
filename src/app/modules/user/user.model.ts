import { Schema, model } from 'mongoose';
import { User } from './user.interface';

const userSchema = new Schema<User>({
  userId: { type: Number, required: [true, 'UserId is required'] },
  username: { type: String, required: [true, 'Username is required'] },
  password: { type: String, required: [true, 'Password is required'] },
  fullName: {
    firstName: { type: String, required: [true, 'FirstName is required'] },
    lastName: { type: String, required: [true, 'LastName is required'] },
  },
  age: { type: Number, required: [true, 'Age is required'] },
  email: { type: String, required: [true, 'Email is required'] },
  isActive: {
    type: Boolean,
    required: [true, 'isActive is required'],
  },
  hobbies: [{ type: String, required: [true, 'Hobbies is required'] }],
  address: {
    street: { type: String, required: [true, 'Street is required'] },
    city: { type: String, required: [true, 'City is required'] },
    country: { type: String, required: [true, 'Country is required'] },
  },
  orders: [
    {
      productName: {
        type: String,
        required: [true, 'ProductName is required'],
      },
      price: { type: Number, required: [true, 'Price is required'] },
      quantity: { type: Number, required: [true, 'Quantity is required'] },
    },
  ],
});

export const UserModel = model<User>('User', userSchema);
