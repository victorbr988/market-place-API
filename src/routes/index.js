const express = require('express');
const { ProtectedRouteMiddleware } = require('../middlewares/protected-route.middleware');
const { MiscController } = require('../controllers/misc/misc.controller');
const { CreateUserController } = require('../controllers/users/create-user.controller');
const { GetUsersController } = require('../controllers/users/get-users.controller');
const { GetUserController } = require('../controllers/users/get-user.controller');
const { UpdateUserController } = require('../controllers/users/update-user.controller');
const { CreateSessionController } = require('../controllers/sessions/create-session.controller');
const { DeleteSessionController } = require('../controllers/sessions/delete-session.controller');
const { CreateCondoController } = require('../controllers/condos/create-condo.controller');
const { GetCondosController } = require('../controllers/condos/get-condos.controller');
const { GetCondoController } = require('../controllers/condos/get-condo.controller');
const { UpdateCondoController } = require('../controllers/condos/update-condo.controller');
const { CreateItemController } = require('../controllers/items/create-item.controller');
const { GetItemsController } = require('../controllers/items/get-items.controller');
const { GetItemController } = require('../controllers/items/get-item.controller');
const { UpdateItemController } = require('../controllers/items/update-item.controller');
const { GetCategoriesController } = require('../controllers/categories/get-categories.controller');
const { DeleteImageController } = require('../controllers/images/delete-image.controller');
const { CreateImageController } = require('../controllers/images/create-images.controller');
const { GetItemByUserIdController } = require('../controllers/items/get-item-by-user.controller');

const multer = require('multer');
const config = require('../multer/config');
const { GetUserLoggedController } = require('../controllers/users/get-user-logged.controller');

const routes = express.Router();
const uploads = multer(config)

/* Misc */
routes.get('/misc', MiscController.handler);

/* Sessions */
routes.post('/sessions', CreateSessionController.handler);
routes.delete('/sessions', DeleteSessionController.handler);

/* Users */
routes.post('/users', CreateUserController.handler);
routes.get('/users', GetUsersController.handler);
routes.get('/users/logged', ProtectedRouteMiddleware.handler, GetUserLoggedController.handler)
routes.get('/users/:id', GetUserController.handler);
routes.patch('/users/:id', UpdateUserController.handler);

/* Condos */
routes.post('/condos', uploads.array("file"), CreateCondoController.handler);
routes.get('/condos', GetCondosController.handler)
routes.get('/condos/:id', GetCondoController.handler)
routes.patch('/condos/:id', ProtectedRouteMiddleware.handler, UpdateCondoController.handler)

/* Items */
routes.post('/items', ProtectedRouteMiddleware.handler, uploads.array("file"), CreateItemController.handler)
routes.get('/items', GetItemsController.handler)
routes.get('/items/:id', GetItemController.handler)
routes.get('/items/seler/:id', GetItemByUserIdController.handler)
routes.patch('/items/:id', ProtectedRouteMiddleware.handler, UpdateItemController.handler)

/* Categories */
routes.get('/categories',  GetCategoriesController.handler)

/* uploads */
routes.post("/images", ProtectedRouteMiddleware.handler, uploads.array("file"), CreateImageController.handler)
routes.delete('/images/:id', ProtectedRouteMiddleware.handler, DeleteImageController.handler)

module.exports = { routes };
