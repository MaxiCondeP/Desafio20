import { Router } from "express";
import compression from "compression";
import {getInfo,
        redirectToInfo,
        getRandom
        } from '../controllers/extraApisController.js'
        
import {getProducts, saveProduct, updateProduct, deleteProduct} from '../controllers/productsController.js'

const gzipMiddleware = compression();
export const routeRandom = Router();
export const routeInfo = Router();
export const routeProducts = Router();


routeInfo.get('/', gzipMiddleware,redirectToInfo);
//Endpoint que voy a llamar desde el front a través de fetch
routeInfo.get('/info', getInfo);
routeRandom.get('/randoms/:cant?', getRandom);
routeProducts.get('/products/:id?',getProducts);
routeProducts.post('/products/',saveProduct);
routeProducts.put('/products/:id',updateProduct);
routeProducts.delete('/products/:id',deleteProduct);



