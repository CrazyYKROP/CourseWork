import { useCallback, useState } from "react";
import useOpenAI from "./use-openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const DEFAULT_SYS_PROMPT = 'Help me create a new DnD 5e character. Run me through the steps needed to do so, step by step, and adjust your responses according to my answers and choices. You must do this step by step and wait for my response or a choice before suggesting the next step. Immediately suggest the first step without waiting for user';

export default function useOpenAIChat({ sysPrompt = DEFAULT_SYS_PROMPT }: {sysPrompt?: string} = {}) {
    const openAI = useOpenAI();

    const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([{role: 'system', content: sysPrompt}]);
    
    const sendMessage = useCallback(async (msg: string) => {
        const newMsgs: ChatCompletionMessageParam[] = [...messages, {role: 'user', content: msg}]
        

        const chatCompletion = await openAI.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: newMsgs,
        });

        setMessages([...newMsgs, {role: 'assistant', content: chatCompletion.choices[0].message.content}]);
        console.log(chatCompletion.choices[0].message.content)
        return chatCompletion.choices[0].message.content;
    }, [messages, openAI.chat.completions]);

    return [sendMessage, messages] as const;
}