import { User } from '../../models';
import { fetcher } from '../fetchJson';

export class UserService {
    public getUser(email: string): Promise<User> {
        return fetcher('/api/users/get', { method: 'POST', body: JSON.stringify({ email }) })
            .then(({ user }: { user: User }) => user);
    }
}

let instance: UserService | null = null;
export default function useUserService() {
    if (instance === null) {
        instance = new UserService();
    }

    return instance;
}
