
import {z} from "zod"

const portSchema = z.coerce.number().min(1000).max(9999).default(3000);
export const PORT = portSchema.parse(process.env.PORT);