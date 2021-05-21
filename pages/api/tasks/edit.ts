import { NextApiResponse } from 'next';
import { Task } from '@prisma/client'

import { withSession } from '../../../lib/session';
import prisma from '../../../lib/prisma';
import { IronNextApiRequest } from '../user';

export default withSession(async (req: IronNextApiRequest, res: NextApiResponse) => {
    const { id, title, done } = JSON.parse(req.body);

    try {
        const task: Task = await prisma.task.update({
            where: { id },
            data: {
                title,
                done
            }
        })
        
        res.json({ task });
    } catch (error) {
        const { response: fetchResponse } = error
        res.status(fetchResponse?.status || 500).json(error.data)
    }
});
