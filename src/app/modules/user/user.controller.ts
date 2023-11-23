import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await UserServices.createUser(req.body);

    const { password, ...others } = user.toObject();

    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: others,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserServices.getAllUsers();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: users,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await UserServices.getSingleUsers(userId);

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: user,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    await UserServices.deleteUser(userId);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

export const UsersControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
