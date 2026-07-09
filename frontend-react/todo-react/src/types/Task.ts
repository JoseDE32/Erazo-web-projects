export interface Task{
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    createAt?: Date;
    updatedAt?: Date;
}

export interface FilterSortTask{
    title?: string;
    description?: string;
    titleAndDescription?: string;
    status?: TaskStatus[];
    createdFrom?: Date;
    createdTo?: Date;
    updatedFrom?: Date;
    updatedTo?: Date;
    page?: number;
    size?: number;
    sortBy?: string;
    direction?: string;
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