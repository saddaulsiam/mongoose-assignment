import express from 'express';
import { UsersControllers } from './user.controller';

const router = express.Router();

router
  .route('/')
  .post(UsersControllers.createUser)
  .get(UsersControllers.getAllUsers);

router
  .route('/:userId')
  .get(UsersControllers.getUserById)
  .put(UsersControllers.updateUser)
  .delete(UsersControllers.deleteUser);

router
  .route('/:userId/orders')
  .put(UsersControllers.createOrder)
  .get(UsersControllers.getOrders);

router.get('/:userId/orders/total-price', UsersControllers.getOrderTotalPrice);

export const UserRoutes = router;
