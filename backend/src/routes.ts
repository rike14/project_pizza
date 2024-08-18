import { Router } from "express";
import multer from "multer";

import uploadConfig from './config/multer';
import { isAuthenticated } from "./middlewares/isAuthenticated";

import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

import { CreateProductController } from "./controllers/product/CreateProductController";

const router = Router()

const upload = multer(uploadConfig.upload("./tmp"))

// USER ROUTES
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle)

// CATEGORIES ROUTES
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
router.get('/category', isAuthenticated, new ListCategoryController().handle)

// PRODUCTS ROUTES
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)

export { router };
