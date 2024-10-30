import {AiMessage} from "../open-api/types";


function removeFileLinks(text: string): string {
    const regex = /【\d+:\d+†source】/g;
    return text.replace(regex, '');
}


export const messageFromAi = (data: []) => {

    const text = data.map(({content}: AiMessage) => {
        return content.map(({text}) => removeFileLinks(text.value))
    });

    return text.join(' ');
}