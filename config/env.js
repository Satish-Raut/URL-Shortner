// Validating the port environment variable using ZOD
import "dotenv/config";
import { z } from "zod";

const portSchema = z.coerce.number().min(1000).max(9999).default(3000);
export const PORT = portSchema.parse(process.env.PORT);

export const env = z
  .object({
    PORT: z.coerce.number().default(3000),
    MONGODB_URL: z.string(),
    MONGODB_DATABASE_NAME: z.string(),
  })
  .parse(process.env);
