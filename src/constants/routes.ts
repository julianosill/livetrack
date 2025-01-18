export const ROUTES = {
  api: {
    auth: {
      signInWithGoogle: '/api/auth/sign-in/google',
      refreshToken: '/api/auth/refresh-token',
      signOut: '/api/auth/sign-out',
    },
  },
  auth: {
    signIn: '/auth/sign-in',
    signup: '/auth/sign-up',
  },
  docs: {
    terms: '/docs/terms',
    privacy: '/docs/privacy',
  },
  home: '/',
  livechat: '/livechat',
  superchats: '/superchats',
}
