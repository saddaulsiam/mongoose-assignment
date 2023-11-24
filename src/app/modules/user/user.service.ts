import { Order, User } from './user.interface';
import { UserModel } from './user.model';

const createUser = async (data: User) => {
  const user = await UserModel.create(data);
  return user;
};

const getAllUsers = async () => {
  const users = await UserModel.aggregate([]).project({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });
  return users;
};

const getUserById = async (userId: string) => {
  const users = await UserModel.findById({ _id: userId }).select('-password');
  return users;
};

const updateUser = async (userId: string, userData: User) => {
  const result = await UserModel.findOneAndUpdate(
    { _id: userId },
    {
      $set: userData,
    },
    { new: true },
  ).select({ password: 0 });
  return result;
};

const deleteUser = async (userId: string) => {
  const users = await UserModel.findOneAndDelete({ _id: userId });
  return users;
};

const createOrder = async (userId: string, orderData: Order) => {
  const result = await UserModel.findOneAndUpdate(
    { _id: userId },
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
