import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { Task } from '@prisma/client'

import prisma from '../../../lib/prisma';
import { Task as TaskFront } from '../../../models/';

export default withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse) => {
    const { task } = JSON.parse(req.body) as {task: TaskFront};
    
    try {
        const existingTask = await prisma.task.findUnique({
            where: { id: task.id },
            select: { done: true }
        });

        if (existingTask) {
            const updatedTask: Task = await prisma.task.update({
                where: { id: task.id },
                data: {
                    title: task.title,
                    link: task.link,
                    assigned: task.assigned,
                    available: !task.assigned
                }
            });

            res.json({ task: updatedTask });
        } else {
            res.status(404).json({ message: `Task with ID ${task.id} not found` })
        }
    } catch (error) {
        const { response: fetchResponse } = error
        res.status(fetchResponse?.status || 500).json(error.data)
    }
});
