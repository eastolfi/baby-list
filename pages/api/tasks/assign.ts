import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';
import { Task } from '@prisma/client'

import prisma from '../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { taskId, unassign, assigned } = JSON.parse(req.body) as {taskId: string, unassign?: boolean, assigned?: string};
    const session = getSession(req, res);
    try {
        if (!assigned && !session?.user) {
            res.status(404).json({ message: 'No user to assign found' });
            return;
        }
        
        const { name, nickname, email } = session?.user || {};
        const assignedTo = unassign ? null : assigned || name || nickname || email;

        const updatedTask: Task = await prisma.task.update({
            where: { id: taskId },
            data: {
                assigned: assignedTo,
                available: assignedTo ? false : true
            }
        });
        
        if (updatedTask) {
            res.json({ assigned: assignedTo });
        } else {
            console.log(0)
            res.status(404).json({ message: `Task with ID ${taskId} not found` })
        }
    } catch (error: any) {
        if (error.response) {
            const { response: fetchResponse } = error
            res.status(fetchResponse?.status || 500).json({ data: error.data, message: 'Error' })
        } else {
            res.status(500).json({ message: error.message })
        }
    }
};
