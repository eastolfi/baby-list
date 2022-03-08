import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { Task } from '@prisma/client'

import prisma from '../../../lib/prisma';

export default withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse) => {
    const { taskId } = JSON.parse(req.body) as {taskId: string};

    try {
        const task = await prisma.task.findUnique({
            where: { id: taskId },
            select: { done: true }
        });

        if (task) {
            const updatedTask: Task = await prisma.task.update({
                where: { id: taskId },
                data: {
                    done: !task.done
                }
            });

            res.json({ task: updatedTask });
        } else {
            res.status(404).json({ message: `Task with ID ${taskId} not found` })
        }
    } catch (error: any) {
        const { response: fetchResponse } = error
        res.status(fetchResponse?.status || 500).json(error.data)
    }
});
