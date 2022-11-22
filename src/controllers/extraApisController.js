import { randomNumbers } from "../utils/random.js";
import os from "os";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export const getInfo = (req, res) => {
    let args = process.argv;
    let platform = process.platform;
    let version = process.version;
    let memory = process.memoryUsage().rss;
    let path = process.execPath;
    let id = process.pid;
    let folder = process.cwd();
    let numCPUs = os.cpus().length;
    res.json({ args, platform, version, memory, path, id, folder, numCPUs })
}

export const redirectToInfo = (req, res) => {
    //DEVUELVO A LA PAGINA DE INFO
    res.sendFile(__dirname + "/public/info.html");
}

export const getRandom= (req,res)=>{
    let cant = 100000000;
    if (req.params.cant) {
        cant = req.params.cant;
    }
    res.send(randomNumbers(cant));
}