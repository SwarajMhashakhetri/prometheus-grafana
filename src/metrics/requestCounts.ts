import client from "prom-client";

export const requestCounter = new client.Counter({
    name:'http_request_total',
    help:'Total number of HTTP Request',
    labelNames: ['method', 'route', 'status_code']
});
