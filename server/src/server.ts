import express, { request, response } from "express";
import cors from 'cors';
import "./database";
import { routes } from "./routes";
import path, {resolve} from "path"


const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, 'uploads')))
app.use(routes);
app.listen(3333, () => console.log("Servidor iniciado na porta 3333"));