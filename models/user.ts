export interface User {
    id: string;
    provider: string;
    userId: string;
    email: string;
    isAdmin?: boolean;
}
