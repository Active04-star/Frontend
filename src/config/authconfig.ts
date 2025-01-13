import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0({
    baseURL: process.env.AUTH0_BASE_URL || 'http://localhost:3000',
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    secret: process.env.AUTH0_SECRET,
    routes: {
        callback: '/api/auth/callback',
        postLogoutRedirect: '/',
    },
    session: {
        rollingDuration: 1,
        absoluteDuration: 1,
        cookie: {
            transient: true,
            secure: false,
            sameSite: "none",
        }
    },
});