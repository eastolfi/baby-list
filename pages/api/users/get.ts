import { NextApiRequest, NextApiResponse } from 'next';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { Task, User } from '@prisma/client'

import prisma from '../../../lib/prisma';

export default withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse) => {
    const { email } = JSON.parse(req.body) as {email: string};
    // const session = getSession(req, res);
    try {
        // if (!session?.user) {
        //     res.status(404).json({ message: 'No user to assign found' });
        //     return;
        // }
        
        // const { name, nickname, email } = session.user;
        
        const user: User | null = await prisma.user.findUnique({
            where: {
                email
            }
        })
        
        if (user) {
            res.json({ user });
        } else {
            console.log(0)
            res.status(404).json({ message: `User with email ${email} not found` })
        }
    } catch (error) {
        if (error.response) {
            const { response: fetchResponse } = error
            res.status(fetchResponse?.status || 500).json({ data: error.data, message: 'Error' })
        } else {
            res.status(500).json({ message: error.message })
        }
    }
});
