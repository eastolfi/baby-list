import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { User } from '@prisma/client'

import prisma from '../../../lib/prisma';

export default withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse) => {
    const { email } = JSON.parse(req.body) as {email: string};

    try {
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
