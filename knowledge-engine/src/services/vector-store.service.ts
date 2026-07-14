import { EmbeddedChunk } from "../types/embedding.type"
import { Pinecone } from "@pinecone-database/pinecone";
const pc = new Pinecone({
    apiKey: `${process.env.PINECONE_API_KEY}`
})
const index = pc.index('knowledge-base');
class VectorStoreService {
    async addDocuments(EmbeddedChunk: EmbeddedChunk[]) {
        await index.upsert({
            records: EmbeddedChunk.map((chunk) => ({
                id: chunk.id,
                values: chunk.embedding,
                metadata: {
                    text: chunk.text,
                    ...chunk.metadata,
                }

            }))
        })
    }

    async searchDocuments(queryEmbedding: number[]) {
        const results = await index.query({
            vector: queryEmbedding,
            topK: 5,
            includeMetadata: true,
            includeValues: false,
        });

        return results.matches;
    }
}

export const vectorStoreService = new VectorStoreService();
