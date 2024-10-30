export type Question = {
    role: Role,
    content: string,
}

export enum Role {
    User = 'user',
    Assistant = 'assistant',
    System = 'system'
}

export enum ThreadStatus {
    Completed = 'completed',
    Pending = 'pending',
    InProgress = 'in_progress',
    Failed = 'failed',
    Canceled = 'canceled',
    Queued = 'queued',
    Scheduled = 'scheduled',
    Rejected = 'rejected',
    UnderReview = 'under_review',
}

export const statusMap: { [key: string]: ThreadStatus } = {
    'completed': ThreadStatus.Completed,
    'pending': ThreadStatus.Pending,
    'in_progress': ThreadStatus.InProgress,
    'failed': ThreadStatus.Failed,
    'canceled': ThreadStatus.Canceled,
    'queued': ThreadStatus.Queued,
    'scheduled': ThreadStatus.Scheduled,
    'rejected': ThreadStatus.Rejected,
    'under_review': ThreadStatus.UnderReview,
};

export type QuestionResponse = {
    id: string,
    thread_id: string,
    created_at: number,
}

export type  AiMessage = {
    content: {
        text: {
            value: string
        },
    }[]
}