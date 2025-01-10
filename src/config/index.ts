import { z } from 'zod'

const envSchema = z.object({
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  GOOGLE_REDIRECT_URI: z.string().url(),

  JWT_SECRET_KEY: z.string().min(1),

  NEXT_PUBLIC_APP_BASE_URL: z.string().url(),
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
