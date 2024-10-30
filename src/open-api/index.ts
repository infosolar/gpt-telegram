import {Thread} from "../database/thread.model";
import {OpenAIApi} from "./ai-api";
import {Role, ThreadStatus} from "./types";
import {messageFromAi} from "../message";

export const ask = async (chat_id: number, content: string) => {
    const [thread] = await Thread.findOrCreate({
        where: {
            chat_id: Number(chat_id),
        },
    })

    if (!thread.thread_id) {
        thread.thread_id = await OpenAIApi.thread();
        await thread.save();
    }

    await thread.reload()

    const canAsk = await OpenAIApi.runInProgress(thread.thread_id);

    if (!canAsk) {
        return "Запрос уже обрабатывается"
    }

    const question = {
        content,
        role: Role.User
    }

    const ask = await OpenAIApi.ask(thread.thread_id, question);

    const runId = await OpenAIApi.run(ask.thread_id);

    let threadStatus = await OpenAIApi.check(ask.thread_id, String(runId));

    while (threadStatus !== ThreadStatus.Completed &&
    threadStatus != ThreadStatus.Failed &&
    threadStatus != ThreadStatus.Rejected &&
    threadStatus != ThreadStatus.Canceled) {
        console.log(`${content} - ${threadStatus}`);
        threadStatus = await OpenAIApi.check(ask.thread_id, String(runId))
        await new Promise(resolve => setTimeout(resolve, 5000));
    }

    if (threadStatus === ThreadStatus.Failed || threadStatus === ThreadStatus.Canceled || threadStatus === ThreadStatus.Rejected) {
        return "Ошибка обработки"
    }

    const answer = await OpenAIApi.answerOn(ask);

    return messageFromAi(answer.data);
}

const thread = async (chat_id: number): Promise<string | undefined> => {

    const thread = await Thread.findOne({
        where: {
            chat_id: chat_id,
        },
    })

    if (thread) {
        thread.thread_id = await OpenAIApi.thread();
        await thread.save();
        await thread.reload()
        return thread?.thread_id;
    }
}

export const OpenAI = {
    ask,
    thread,
}
