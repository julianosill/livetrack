import { google } from 'googleapis'

import { env } from '@/config'

export const googleOAuth2Client = new google.auth.OAuth2(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  env.GOOGLE_REDIRECT_URI,
)

export const googleOAuth2 = google.oauth2({ auth: googleOAuth2Client, version: 'v2' })

export const youtube = (auth: typeof googleOAuth2Client) => google.youtube({ version: 'v3', auth })

export const googleSheets = (auth: typeof googleOAuth2Client) => google.sheets({ version: 'v4', auth })
