import express from 'express';

import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import UsersController from './controllers/UsersController';
import SessionsController from './controllers/SessionsController';
import authMiddleware from './middlewares/authMiddleware';

const routes = express.Router();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
const usersController = new UsersController();
const sessionsController = new SessionsController();

// Create User
routes.post('/users', usersController.create);

// Sessions (Authentication)
routes.post('/login', sessionsController.create);

// Auth Mddleware
routes.use(authMiddleware);

// Classes
routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);

// Connections
routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);

export default routes;
