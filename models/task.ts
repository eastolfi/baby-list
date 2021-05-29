import { User } from "./user";

export interface Task {
    id: string;
    title: string;
    link?: string;
    picture?: string;
    done?: boolean;
    available?: boolean;
    assigned?: string;
    createdBy?: User;
}
