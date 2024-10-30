import axios, {AxiosError} from 'axios';
import {Question, QuestionResponse, ThreadStatus} from "./types";

const instance = axios.create({
    baseURL: 'https://api.openai.com/v1',
    headers: {
        Authorization: `Bearer TOKEN`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
    }
});

const thread = async (): Promise<string> => {
    const {data} = await instance.post('/threads');
    return data.id;
}

const ask = async (thread_id: string, question: Question): Promise<QuestionResponse> => {
    const {data} = await instance.post(`/threads/${thread_id}/messages`, question)
    return {
        id: data.id,
        thread_id: data.thread_id,
        created_at: data.created_at,
    };
}

const run = async (thread_id: string): Promise<string | undefined> => {
    try {
        const {data} = await instance.post(`/threads/${thread_id}/runs`, {
            "assistant_id": 'assistant_id',
            "instructions": "Please respond to question based in instructions you have"
        })
        return data.id;

    }
        //@ts-ignore
    catch (e: AxiosError) {
        console.log(e);
    }
}

const runInProgress = async (thread_id: string): Promise<boolean> => {
    const {data} = await instance.get(`/threads/${thread_id}/runs`)
    const incompleteTasks = data.data.filter((run: any) => run.status === ThreadStatus.InProgress || run.status === ThreadStatus.Queued);
    return !incompleteTasks.length
}

const check = async (thread_id: string, run_id: string): Promise<ThreadStatus> => {
    const {data, status} = await instance.get(`/threads/${thread_id}/runs/${run_id}`)

    if (data.last_error) {
        console.log(data.last_error)
    }

    return data.status as ThreadStatus
}

const answerOn = async (question: QuestionResponse) => {
    const {data} = await instance.get(`/threads/${question.thread_id}/messages`, {
        params: {
            before: question.id,
            include_messages: true,
        }
    })

    return data;
}

export const OpenAIApi = {
    thread,
    ask,
    run,
    runInProgress,
    check,
    answerOn,
}