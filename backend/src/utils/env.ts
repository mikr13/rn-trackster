import dotenv from "dotenv";
import { cleanEnv, num, str, testOnly } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ devDefault: testOnly("test"), choices: ["development", "production", "test"] }),
  MONGO_URI: str({ devDefault: testOnly("mongodb://localhost:27017/track-server") }),
  JWT_SECRET_KEY: str({ devDefault: testOnly("mysecretkey") }),
  COMMON_RATE_LIMIT_MAX_REQUESTS: num({ devDefault: testOnly(1000) }),
  COMMON_RATE_LIMIT_WINDOW_MS: num({ devDefault: testOnly(1000) }),
});
