import client from 'prom-client';

export const activeRequestGauge = new client.Gauge({
    name:'active_request',
    help:'Number Of Active Request',
});
