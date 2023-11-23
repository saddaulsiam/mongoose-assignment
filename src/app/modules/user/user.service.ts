import { User } from './user.interface';
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

const getSingleUsers = async (userId: string) => {
  const users = await UserModel.findById(userId).select('-password');
  return users;
};

const deleteUser = async (userId: string) => {
  const users = await UserModel.findOneAndDelete({ userId });
  return users;
};

export const UserServices = {
  createUser,
  getAllUsers,
  getSingleUsers,
  deleteUser,
};
