import { Handler, withIronSession } from 'next-iron-session';

export function withSession(handler: Handler) {
    return withIronSession(handler, {
        password: 'complex_password_at_least_32_characters_long',
        cookieName: 'next.js/examples/with-iron-session',
        cookieOptions: {
            // the next line allows to use the session in non-https environments like
            // Next.js dev mode (http://localhost:3001)
            secure: process.env.NODE_ENV === 'production' ? true : false,
        }
    })
}