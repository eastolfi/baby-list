import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { Task } from '@prisma/client'

import prisma from '../../../lib/prisma';

export default withApiAuthRequired(async (_req: NextApiRequest, res: NextApiResponse) => {
    try {
        const tasks: Task[] = await prisma.task.findMany({
            include: {
                createdBy: {
                    select: {
                        email: true,
                        isAdmin: true
                    }
                }
            }
        });

        res.json({ tasks });
    } catch (error) {
        console.error(error);
        const { response: fetchResponse } = error
        res.status(fetchResponse?.status || 500).json(error.data)
    }
});
