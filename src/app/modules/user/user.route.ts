import express from 'express';
import { UsersControllers } from './user.controller';

const router = express.Router();

router
  .route('/')
  .post(UsersControllers.createUser)
  .get(UsersControllers.getAllUsers);

router
  .route('/:userId')
  .get(UsersControllers.getSingleUser)
  .put(UsersControllers.updateUser)
  .delete(UsersControllers.deleteUser);

export const UserRoutes = router;
