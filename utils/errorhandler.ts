import { ErrorRequestHandler } from 'express';
import logger from './logger';

export const errorHandler: ErrorRequestHandler = (err: Error, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send(err.message);
};