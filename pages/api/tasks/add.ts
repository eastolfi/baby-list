import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { Task } from '@prisma/client';

import prisma from '../../../lib/prisma';

export default withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse) => {
    const { task } = JSON.parse(req.body) as {task: Task};
    const session = getSession(req, res);

    console.log(session?.user)
    
    try {
        // remove the title to test 
        const newTask: Task = await prisma.task.create({
            data: {
                title: task.title,
                available: task.assigned ? false : true,
                assigned: task.assigned
                // userId: session?.user.sub || ''
            }
        });
        
        res.json({ task: newTask });
    } catch (error) {
        console.log(error)
        const { response: fetchResponse } = error
        res.status(fetchResponse?.status || 500).json(error.data || error)
    }
});
