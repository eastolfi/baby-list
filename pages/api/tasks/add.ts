import { NextApiResponse } from 'next';

import { withSession } from '../../../lib/session';
import prisma from '../../../lib/prisma';
import { IronNextApiRequest } from '../user';

import { Task } from '../../task-list';

export default withSession(async (req: IronNextApiRequest, res: NextApiResponse) => {
    console.log(req.body.task)
    const { task } = JSON.parse(req.body) as {task: Task};
    
    try {
        console.log(task.title || 'no title')
        // remove the title to test 
        const newTask: Task = await prisma.task.create({
            data: {
                title: task.title
            }
        })
        console.log(newTask)
        res.json({ task: newTask });
    } catch (error) {
        console.log(error)
        const { response: fetchResponse } = error
        res.status(fetchResponse?.status || 500).json(error.data || error)
    }
});

// export default async function(): Promise<void> {
//     return new Promise((resolve, reject) => {
//         return withSession(async (req: IronNextApiRequest, res: NextApiResponse) => {
//             const { title } = JSON.parse(req.body);

//             prisma.task.create({
//                 data: {
//                     title
//                 }
//             })
//             .then((task: Task) => {
//                 console.log('done')
//                 console.log(task)
//                 res.json({ task });
//                 resolve();
//             })
//             .catch(error => {
//                 res.status(500).send(error);
//                 reject(error);
//             });
//         })
//     });
// };
