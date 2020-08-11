import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import UsersController from './controllers/UsersController';

const routes = express.Router();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
const usersController = new UsersController();

// Test route
routes.get('/', (req, res) => {
  return res.json({ message: 'Hello World' });
});

// Users
routes.post('/users', usersController.create);

// Classes
routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);

// Connections
routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);

export default routes;
