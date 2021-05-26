import { NextApiRequest, NextApiResponse } from 'next';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { Task } from '@prisma/client'

import prisma from '../../../lib/prisma';

export default withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse) => {
    const { taskId } = JSON.parse(req.body) as {taskId: string};
    const session = getSession(req, res);
    try {
        if (!session?.user) {
            res.status(404).json({ message: 'No user to assign found' });
            return;
        }
        
        console.log(taskId)

        const { name, nickname, email } = session.user;
        const assignedTo = name || nickname || email;
        
        const updatedTask: Task = await prisma.task.update({
            where: { id: taskId },
            data: {
                assigned: assignedTo,
                available: false
            }
        });
        
        if (updatedTask) {
            res.json({ assigned: assignedTo });
        } else {
            console.log(0)
            res.status(404).json({ message: `Task with ID ${taskId} not found` })
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
