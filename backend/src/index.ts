import { errorHandler } from "@/middlewares/error-handler";
// import { rateLimiter } from "@/middlewares/rate-limiter";
import "@/models/track";
import "@/models/user";
import { router as authRoutes } from "@/routes/auth-routes";
import { router as healthRoutes } from "@/routes/health-routes";
import { router as trackRoutes } from "@/routes/track-routes";
import { env } from "@/utils/env";

import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
// app.use(rateLimiter);

// Base route prefix
const baseRoute = "/api/v1";

app.use(`${baseRoute}/health`, healthRoutes);
app.use(`${baseRoute}/auth`, authRoutes);
app.use(`${baseRoute}/track`, trackRoutes);

app.use(errorHandler());

const mongoUri: string = env.MONGO_URI || "";

if (!mongoUri) {
  throw new Error(`MongoURI was not supplied.`);
}

mongoose.connect(mongoUri);

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
