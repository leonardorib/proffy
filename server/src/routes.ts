import express from 'express';

import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import UsersController from './controllers/UsersController';
import SessionsController from './controllers/SessionsController';
import ProfilesController from './controllers/ProfilesController';
import FilesController from './controllers/FilesController';
import authMiddleware from './middlewares/authMiddleware';

import multer from 'multer';
import multerConfig from './config/multer';

const routes = express.Router();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
const usersController = new UsersController();
const sessionsController = new SessionsController();
const profilesController = new ProfilesController();
const filesController = new FilesController();

// Create User
routes.post('/users', usersController.create);

// Sessions (Authentication)
routes.post('/login', sessionsController.create);

// Auth Mddleware
routes.use(authMiddleware);

// Ony checks if token is valid()
routes.get('/authcheck', (req, res) => {
  return res.json({ auth: true });
});

// Files
routes.post(
  '/upload',
  multer(multerConfig).single('file'),
  filesController.create
);

// Classes
routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);

// User Profile
routes.get('/profile', profilesController.index);
routes.put('/profile', profilesController.update);

// Connections
routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);

export default routes;
