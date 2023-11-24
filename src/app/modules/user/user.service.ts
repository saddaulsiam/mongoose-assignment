import { User } from './user.model';
import { TOrder, TUser } from './user.interface';

const createUser = async (data: TUser) => {
  const user = await User.create(data);
  return user;
};

const getAllUsers = async () => {
  const users = await User.aggregate([]).project({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });
  return users;
};

const getUserById = async (userId: string) => {
  const users = await User.findOne({ userId }).select('-password');
  return users;
};

const updateUser = async (userId: string, userData: TUser) => {
  const result = await User.findOneAndUpdate(
    { userId },
    {
      $set: userData,
    },
    { new: true, runValidators: true },
  ).select({ password: 0 });
  return result;
};

const deleteUser = async (userId: string) => {
  const users = await User.deleteOne({ userId });
  return users;
};

const createOrder = async (userId: string, orderData: TOrder) => {
  const result = await User.findOneAndUpdate(
    { userId },
    { $push: { orders: orderData } },
    { upsert: true, new: true },
  );
  return result;
};

export const UserServices = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createOrder,
};
