import express from 'express';
import jwt from 'jsonwebtoken';

import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import UsersController from './controllers/UsersController';
import SessionsController from './controllers/SessionsController';

// Authentication middleware
function authMiddleware(req, res, next) {}

const routes = express.Router();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
const usersController = new UsersController();
const sessionsController = new SessionsController();

// Users
routes.post('/users', usersController.create);

// Sessions (Authentication)
routes.post('/login', sessionsController.create);

// Classes
routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);

// Connections
routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);

export default routes;
