import express, {Express} from 'express';
import configServer from './config/configServer';
import * as bodyParser from 'body-parser';
const server: Express = express();
server.use(bodyParser.json());
server.use(express.json());
// Middleware para parsear el cuerpo de las solicitudes en formato JSON
configServer(server);
export default server;
