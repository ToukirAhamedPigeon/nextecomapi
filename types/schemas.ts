import { z, ZodType } from "zod";
import { BrandFormData, TokenFormData } from "./forms";

export const tokenValidationSchema:ZodType<TokenFormData> = z.object({
    template: z.string(),
    token: z.string(),
    user_id: z.string(),
    status: z.enum(["draft","published","archived"]).optional(),
});

export const brandValidationSchema:ZodType<BrandFormData> = z.object({
    name: z.string(),
    description: z.string().optional(),
    slug: z.string(),
    image: z.string(),
    user_id: z.string(),
    status: z.enum(["draft","published","archived"]).optional(),
});
