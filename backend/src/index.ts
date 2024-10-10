import { errorHandler } from "@/middlewares/error-handler";
import { rateLimiter } from "@/middlewares/rate-limiter";
import "@/models/track";
import "@/models/user";
import { router as authRoutes } from "@/routes/auth-routes";
import express from "express";
import mongoose from "mongoose";
import { router as trackRoutes } from "./routes/track-routes";
import { env } from "./utils/env";

const app = express();

app.use(express.json());
app.use(rateLimiter);

app.use(authRoutes);
app.use(trackRoutes);

app.use(errorHandler());

const mongoUri: string = env.MONGO_URI || "";

if (!mongoUri) {
  throw new Error(`MongoURI was not supplied.`);
}

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions);

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
