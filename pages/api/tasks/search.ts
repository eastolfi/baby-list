import { NextApiResponse } from 'next';
import { Task } from '@prisma/client'

import { withSession } from '../../../lib/session';
import { IronNextApiRequest } from '../user';
import prisma from '../../../lib/prisma';
import { withIronSession } from 'next-iron-session';

// export default withSession(async (_req: IronNextApiRequest, res: NextApiResponse) => {
//     prisma.task.findMany()
//     .then((tasks: Task[]) => {
//         res.json({ tasks });
//     })
//     .catch(error => {
//         res.status(500).send(error);
//     });
// });

// export default function(): Promise<void> {
//     console.log(1)
//     return new Promise((resolve, reject) => {
//         console.log(2)
//         return withSession((_req: IronNextApiRequest, res: NextApiResponse) => {
//             console.log(3)
//             prisma.task.findMany()
//             .then((tasks: Task[]) => {
//                 console.log(4)
//                 res.status(200).send({ tasks });
//                 resolve();
//             })
//             .catch(error => {
//                 console.log(5)
//                 res.status(500).send(error);
//                 reject(error);
//             });
//         })
//     });
// };

// export default function(): Promise<void> {
//     console.log(1)

//     return new Promise((resolve, reject) => {
//         console.log(2)

//         const handler = (_req: IronNextApiRequest, res: NextApiResponse) => {
//         };
//         const asd = withIronSession(handler, {
//             password: 'complex_password_at_least_32_characters_long',
//             cookieName: 'next.js/examples/with-iron-session',
//             cookieOptions: {
//                 // the next line allows to use the session in non-https environments like
//                 // Next.js dev mode (http://localhost:3001)
//                 secure: process.env.NODE_ENV === 'production' ? true : false,
//             }
//         });
//         // console.log((asd as Promise<any>).then)
//     });
// }

export default withSession(async (_req: IronNextApiRequest, res: NextApiResponse) => {
    try {
        const tasks: Task[] = await prisma.task.findMany();
        
        res.json({ tasks });
    } catch (error) {
        const { response: fetchResponse } = error
        res.status(fetchResponse?.status || 500).json(error.data)
    }
});
