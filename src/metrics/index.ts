import type { NextFunction, Request, Response } from "express";
import { requestCounter } from "./requestCounts.js";
import { activeRequestGauge } from "./activeRequest.js";
import { httpRequestDurationMicroSeconds } from "./requestTime.js";

export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) =>{
    const startTime = Date.now();

    activeRequestGauge.inc();

    res.on('finish', () => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        requestCounter.inc({
            method : req.method,
            route: req.route ? req.route.path : req.path,
            status_code : res.statusCode
        });

        httpRequestDurationMicroSeconds.observe({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code : res.statusCode 
        }, duration)

        activeRequestGauge.dec();
    });

    next();
}