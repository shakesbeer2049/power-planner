import express from 'express';

const globalErrorHandler = (err:any, req:express.Request, res:express.Response, next:any) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status : err.status,
        message : err.message
    });
};

export default globalErrorHandler;