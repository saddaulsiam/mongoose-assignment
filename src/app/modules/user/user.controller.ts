import { Request, Response } from 'express';
import { UserServices } from './user.service';
import UserValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const zodParsedData = UserValidationSchema.parse(req.body);

    const user = await UserServices.createUser(zodParsedData);

    const { password, ...others } = user.toObject();

    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: others,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
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

const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await UserServices.getUserById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

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

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await UserServices.getUserById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    const zodParsedData = UserValidationSchema.parse(req.body);

    const result = await UserServices.updateUser(userId, zodParsedData);

    res.status(200).json({
      success: true,
      message: 'User update successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

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

const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orderData = req.body;

    const user = await UserServices.getUserById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    await UserServices.createOrder(userId, orderData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
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

const getOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await UserServices.getUserById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    const { orders } = user.toObject();

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully',
      data: {
        orders,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getOrderTotalPrice = async (req: Request, res: Response) => {
  try {
    const user = await UserServices.getUserById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    let totalPrice = 0;

    user.orders.forEach((order) => {
      totalPrice += order.price * order.quantity;
    });

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice,
      },
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
  getUserById,
  updateUser,
  deleteUser,
  createOrder,
  getOrders,
  getOrderTotalPrice,
};
