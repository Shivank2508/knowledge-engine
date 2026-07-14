import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai"
import { Chunk } from "../types/chunks.type";
import { vectorStoreService } from "./vector-store.service";


const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "gemini-embedding-001",
    apiKey: process.env.GEMINI_API_KEY
})

export async function embededChunk(chunks: Chunk[]) {
    const texts = chunks.map(chunk => chunk.text)
    const vectors = await embeddings.embedDocuments(texts)
    return chunks.map((chunk, index) => ({
        id: chunk.id,
        text: chunk.text,
        embedding: vectors[index],
        metadata: chunk.metadata
    }));
}


export async function embedQuery(query: string) {
    const embedding = await embeddings.embedQuery(query);
    const result = await vectorStoreService.searchDocuments(embedding);
    const filtered = result.filter(
        (chunk) => chunk.score !== undefined && chunk.score > 0.65
    );
    const context = filtered.map(c => c.metadata !== undefined && c?.metadata.text).join("\n\n----------------\n\n");
    return context;
}