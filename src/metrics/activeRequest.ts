import client from 'prom-client';
import type { NextFunction, Request, Response } from "express";


const activeRequestGauge = new client.Gauge({
    name:'active_request',
    help:'Number Of Active Request',
    labelNames: ['method', 'route', 'status_code']
});

export const activeRequestMiddleware = (req : Request, res : Response, next : NextFunction ) => {
    activeRequestGauge.inc({
        method : req.method,
        route: req.route ? req.route.path : req.path,
        status_code : res.statusCode
    });
    res.on("finish", () =>{
        activeRequestGauge.dec({
            method : req.method,
            route: req.route ? req.route.path : req.path,
            status_code : res.statusCode
        });
    });
    next();
}