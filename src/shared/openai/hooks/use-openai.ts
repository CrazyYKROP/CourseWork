import OpenAI from "openai";
import { useState } from "react";

export default function useOpenAI() {
    const [openAI] = useState(new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        organization: import.meta.env.VITE_OPENAI_ORG,
        dangerouslyAllowBrowser: true,
    }));

    return openAI;
}