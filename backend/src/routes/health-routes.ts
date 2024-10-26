import { ServiceResponse } from "@/models/service-response";
import { handleServiceResponse } from "@/utils/http";
import express, { type Router } from "express";

const router: Router = express.Router();

// @ts-expect-error: blud is wilding over here with middlewares
router.get("/", (_, res) => {
  const serviceResponse = ServiceResponse.success("Service is healthy", null);
  return handleServiceResponse(serviceResponse, res);
});

export { router };
