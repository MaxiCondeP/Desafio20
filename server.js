import express from "express";
import handlebars from "express-handlebars";
import { Server as HTTPServer } from "http";
import { routeInfo, routeRandom } from "./src/routes/routesApi.js"
import { routeIndex } from "./src/routes/route.js";
import cluster from "cluster";
import os from "os";
import parseArgs from "minimist";
import {logger} from "./src/utils/logger_config.js"
import passport from "passport";
import { localPassport } from "./src/utils/passport.js";
import session from 'express-session';
import MongoStore from "connect-mongo";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
import { Strategy } from "passport-local";
import { socketChat } from "./src/utils/chat.js";

const options = { default: { PORT: 8080, MODE: "fork" }, alias: { p: "PORT", m: "MODE" } }
const args = parseArgs(process.argv.slice(2), options);

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  store: new MongoStore({
    mongoUrl: 'mongodb+srv://root:pwd123@cluster0.age0did.mongodb.net/?retryWrites=true&w=majority',
    dbName: "ecommerce-db",
    collectionName: "sessions",
    ttl: 600,//Seteo el tiempo de sesión en 10min
    retries: 0
  }),
  secret: 'STRING_SECRET',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
const LocalStrategy = Strategy;
await localPassport(passport,LocalStrategy);

app.use('/',routeIndex);
app.use('/info', routeInfo);
app.use('/api', routeRandom);

//Configuro motor de plantillas
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs"
  })
);
//Seteo motor de plantillas y carpeta contenedora
app.set("view engine", "hbs");
app.set("views", "./public/views");

const PORT = process.env.PORT || args.PORT;
export const httpServer = new HTTPServer(app);
const srv = httpServer;
await socketChat();

if (args.MODE === 'CLUSTER') {

  if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
    console.log("numCPUs", numCPUs)
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on("exit", () => {
      console.log(`Worker died ${process.pid}`);
    })
  } else {

    srv.on("request", (req, res) => {
      const pid = process.pid;
      const fecha = new Date(Date.now());

    });

    try {
      srv.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}. PID: ${process.pid}`);
      });
    } catch (err) {
      logger.log("error",`Error en el servidor: ${err}`);
      console.log("SERVER ERROR", err)
    }


  }
} else {
  try {
    srv.listen(PORT, () => {
      console.log(`Servidor esuchando en el puerto ${PORT}. PID: ${process.pid}`);
    });
    srv.on("error", (error) => console.log(`Error en el servidor: ${error}`));
  } catch (err) {
    logger.log("error",`Error en el servidor: ${err}`);
    console.log("SERVER ERROR!", err)
  }
}
