import { logger } from "../utils/logger_config.js"
import { __dirname } from "../../server.js";

export let logUsr="";

export const redirectToDashboard = (req, res) => {
    //refresco la sesión cada vez que entro al dashboard
    let refreshName = req.session.name;
    req.session.name = refreshName;
    logger.log("info", `Ruta: ${req.url}, Metodo: ${req.method}`);
    res.sendFile(__dirname + '/public/dashboard.html');
}

export const redirectToSignup = (req, res) => {
    logger.log("info", `Ruta: ${req.url}, Metodo: ${req.method}`);
    res.sendFile(__dirname + "/public/signup.html");
}

export const userSignup = (req, res) => {
    req.session.user = req.user;
    console.log(req.session.user)
    logUsr = req.session.user.username
    logger.log("info", `Ruta: ${req.url}, Metodo: ${req.method}`);
    res.redirect("/dashboard");
}

export const userLogin = (req, res) => {
    req.session.user = req.user;
    logUsr = req.session.user.username;
    logger.log("info", `Ruta: ${req.url}, Metodo: ${req.method}`);
    res.redirect("/dashboard");
}

export const checkLogin = (req, res) => {
    //Si esta autenticado va a directo a dashboard
    if (!req.session.user) {
        res.sendFile(__dirname + "/public/login.html");
    } else {
        logger.log("info", `Ruta: ${req.url}, Metodo: ${req.method}`);
        res.redirect("/dashboard");
    }
}

export const userLogout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.send("Error al cerrar sesion");
        }
        logger.log("info", `Ruta: ${req.url}, Metodo: ${req.method}`);
        res.redirect("/login")
    });
}

export const loginFail = (req, res) => {
    logger.log("info", `Ruta: ${req.url}, Metodo: ${req.method}`);
    res.sendFile(__dirname + "/public/failLogin.html");
}

export const signupFail = (req, res) => {
    logger.log("info", `Ruta: ${req.url}, Metodo: ${req.method}`);
    res.sendFile(__dirname + "/public/failSignup.html");
}


export const badRoute = (req, res) => {
    logger.log("warn", `Ruta no encontrada: ${req.url}`)
    res.status(400).send(`Ruta no encontrada: ${req.url}`);
}
