export interface Task {
    id: string;
    title: string;
    description?: string;
    isCompleted: boolean;
    createdAtUtc: string;
}

export interface CreateTaskRequest {
    title: string;
    description?: string;
}

export interface UpdateTaskRequest {
    title: string;
    description?: string;
    isCompleted: boolean;
}