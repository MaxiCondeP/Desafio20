import { Router } from "express";
import compression from "compression";
import {getInfo,
        redirectToInfo,
        getRandom
        } from '../controllers/extraApisController.js'

const gzipMiddleware = compression();
export const routeRandom = Router();
export const routeInfo = Router();


routeInfo.get('/', gzipMiddleware,redirectToInfo);
//Endpoint que voy a llamar desde el front a través de fetch
routeInfo.get('/info', getInfo);
routeRandom.get('/randoms/:cant?', getRandom);


