import express from 'express';
import jwt from 'jsonwebtoken';
import authConfig from './config/auth';

import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import UsersController from './controllers/UsersController';
import SessionsController from './controllers/SessionsController';

// Defining authentication middleware
function authMiddleware(req, res, next) {
  // Checks if there is an authentication header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token was not provided' });
  }

  // Gets only the actual token
  const [, token] = authHeader.split(' ');

  // Verifies token
  jwt.verify(token, authConfig.secret, function (err, decodedToken) {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    } else {
      req.userId = decodedToken.id;
      req.userEmail = decodedToken.email;
      next();
    }
  });
}

const routes = express.Router();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
const usersController = new UsersController();
const sessionsController = new SessionsController();

// Users
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
