import express from "express";
import client from 'prom-client';
import { metricsMiddleware } from "./metrics/index.js";
const app = express();

app.use(express.json());
app.use(metricsMiddleware);

app.get("/user", (req, res) => {
  res.send({
    name: "Swaraj",
    age: 25
  });
});

app.post("user", (req, res) => {
  const user = req.body;
  res.send({
    ...user,
    id: 1
  })
})

app.get("/metrics", async (req, res) => {
  const metrics = await client.register.metrics();
  res.set('Content-Type', client.register.contentType);
  res.send(metrics);
})

app.listen(3000);
