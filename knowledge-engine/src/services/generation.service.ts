import { ChatGroq } from "@langchain/groq";

const model = new ChatGroq({
    model: "llama-3.3-70b-versatile",
    apiKey: process.env.GROQ_API_KEY,
    temperature: 0,
})


export const GenberateAiKnowlege = async (context: string, question: string) => {
    const prompt = `You are an AI Knowledge Assistant.

Answer ONLY using the provided context.

If the answer is not present,
say

"I couldn't find this information in the documents."

Context

--------------------

${context}

--------------------

Question

${question}`


    const response = await model.invoke(prompt);
    return response.content
}




