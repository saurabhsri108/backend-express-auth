import type { Express, Request, Response } from 'express';
import express from 'express';
import dotenv from 'dotenv';
import compression from 'compression';
import cors, { CorsOptions } from 'cors';
import { errorHandler } from './utils/errorhandler';
import logger from './utils/logger';

dotenv.config();

const app: Express = express();
const port: string = process.env.PORT || "5000";
const host: string = process.env.NODE_ENV === 'development' ? `http://localhost:${port}` : ``; // TODO: put the prod host here
const whiteList: string[] = ["http://localhost:3000"];
const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        process.env.NODE_ENV! === 'development' ? origin = 'http://localhost:3000' : '';
        if (whiteList.indexOf(origin!) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Access not allowed: CORS Denial"));
        }
    },
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); // Cross-Origin Resource Sharing protect the client from cookie stealing and other client side attacks
app.use(compression());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    logger.info("GET Request to Homepage");
    res.send("hello-world");
});

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on host: ${host}`));