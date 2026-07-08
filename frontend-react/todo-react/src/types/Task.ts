export interface Task{
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    createAt?: Date;
    updatedAt?: Date;
}

export interface CreateUpdateTask{
    title?: string;
    description?: string;
    status?: TaskStatus;
}

export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}