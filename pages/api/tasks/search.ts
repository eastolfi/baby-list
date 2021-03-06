import { NextApiRequest, NextApiResponse } from 'next';
import { Task } from '@prisma/client'

import prisma from '../../../lib/prisma';

export default async (_req: NextApiRequest, res: NextApiResponse) => {
    try {
        const tasks: Task[] = await prisma.task.findMany({
            include: {
                createdBy: {
                    select: {
                        email: true,
                        isAdmin: true
                    }
                }
            },
            orderBy: {
                title: 'asc'
            }
        });

        res.json({ tasks });
    } catch (error: any) {
        console.error(error);
        const { response: fetchResponse } = error
        res.status(fetchResponse?.status || 500).json(error.data)
    }
};
