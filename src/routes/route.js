import { Router } from 'express';
import passport from "passport";
import { authMiddleware } from '../utils/middlewares.js'
import {
  redirectToDashboard,
  redirectToSignup,
  userSignup,
  userLogin,
  checkLogin,
  userLogout,
  loginFail,
  signupFail,
  badRoute
} from '../controllers/userController.js'

export const routeIndex = Router();

routeIndex.get('/', checkLogin);
routeIndex.post("/signup", 
passport.authenticate("signup", {failureRedirect: "/failSignup",}),userSignup);
routeIndex.post('/login',
passport.authenticate("login", {failureRedirect: "/failLogin",}), userLogin);
routeIndex.get("/login", checkLogin);
routeIndex.get("/signup", redirectToSignup);
routeIndex.get("/dashboard", authMiddleware, redirectToDashboard);
routeIndex.get("/logout", userLogout);
routeIndex.get("/failLogin", loginFail)
routeIndex.get("/failSignup", signupFail);
routeIndex.get("*", badRoute);

