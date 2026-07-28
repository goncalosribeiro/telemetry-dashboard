import express from "express";

const app = express();

/*
 * Middleware
 */
app.use(express.json());

/*
 * Routes
 */
app.get("/", (_request, response) => {
  response.json({
    message: "AquaPulse API",
  });
});

export default app;
