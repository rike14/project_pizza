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
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";

import { AddItemController } from "./controllers/order/AddItemController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";
import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { UpdateItemController } from "./controllers/order/UpdateItemController";

const router = Router()

const upload = multer(uploadConfig.upload("./tmp"))

// USER ROUTES
router.get('/me', isAuthenticated, new DetailUserController().handle)
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)

// CATEGORIES ROUTES
router.get('/category', isAuthenticated, new ListCategoryController().handle)
router.post('/category', isAuthenticated, new CreateCategoryController().handle)

// PRODUCTS ROUTES
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)

// ORDER ROUTES
router.get('/orders', isAuthenticated, new ListOrdersController().handle)
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle)
router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.post('/order/add', isAuthenticated, new AddItemController().handle)
router.put('/order/update', isAuthenticated, new UpdateItemController().handle)
router.put('/order/send', isAuthenticated, new SendOrderController().handle)
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle)
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)

export { router };
