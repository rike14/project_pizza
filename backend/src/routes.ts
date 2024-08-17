import { Router } from "express";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";

const router = Router()

// USER ROUTES
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle)

// CATEGORIES ROUTES
router.post('/category', isAuthenticated, new CreateCategoryController().handle)

export { router };
