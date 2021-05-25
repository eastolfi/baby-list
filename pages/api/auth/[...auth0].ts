import { NextApiRequest, NextApiResponse } from 'next';
import { CallbackOptions, handleAuth, handleCallback, Session } from '@auth0/nextjs-auth0';

import prisma from '../../../lib/prisma';

const afterCallback = async (_req: NextApiRequest, _res: NextApiResponse, session: Session, _state: { [key: string]: any }) => {
    const { user } = session;

    const { email, sub } = user;
    const [ provider, userAuthId ] = (sub as string).split('|');

    try {
        const newUser = await prisma.user.upsert({
            where: {
                userId: userAuthId
            },
            create: {
                provider,
                userId: userAuthId,
                email
            },
            update: {}
        });
    
        if (!newUser) {
            throw new Error('no user found after the login')
        }
    } catch (error) {
        console.log(error);
    } finally {
        return session;
    }
}

export default handleAuth({
    async callback(req: NextApiRequest, res: NextApiResponse, options?: CallbackOptions) {
        try{
            await handleCallback(req, res, {
                ...options,
                afterCallback
            });
        } catch (error) {
            res.status(error.status || 400).end(error.message);
        }
    }
});
