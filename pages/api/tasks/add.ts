import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { Task } from '@prisma/client';

import prisma from '../../../lib/prisma';

export default withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse) => {
    const { task } = JSON.parse(req.body) as {task: Task};
    const session = getSession(req, res);

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: session?.user.email
            }
        });

        if (!user) {
            throw new Error('no user found when creating the task');
        }

        // remove the title to test error
        const newTask: Task = await prisma.task.create({
            data: {
                title: task.title,
                link: task.link,
                available: task.assigned ? false : true,
                assigned: task.assigned,
                userId: user.id
            }
        });
        
        res.json({ task: newTask });
    } catch (error: any) {
        console.log(error)
        const { response: fetchResponse } = error
        res.status(fetchResponse?.status || 500).json(error.data || error)
    }
});
