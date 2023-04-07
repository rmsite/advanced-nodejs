export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '961574021546434',
    clientSecret: process.env.FB_CLIENT_SECRET ?? 'e989dc6676aa98a69ce9d74e1bd47ff1'
  },
  port: process.env.PORT ?? 8080,
  jwtSecret: process.env.JWT_SECRET ?? 'p!#@$FA1'
}
