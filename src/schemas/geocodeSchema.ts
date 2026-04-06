import z from "zod";

export const geocodeSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    region: z.string(),
    country: z.string(),
    lat: z.number(),
    lon: z.number(),
    url: z.string(),
  }),
);
