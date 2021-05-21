import { NextApiRequest, NextApiResponse } from 'next';

import { withSession } from '../../lib/session';

export interface IronNextApiRequest extends NextApiRequest {
    session: any;
}


export default withSession(async (req: IronNextApiRequest, res: NextApiResponse) => {
    const user = req.session.get('user');

    if (user) {
        // in a real world application you might read the user id from the session and then do a database request
        // to get more information on the user if needed
        res.json({
            isLoggedIn: true,
            ...user,
        });
    } else {
        res.json({
            isLoggedIn: false,
        });
    }
});
