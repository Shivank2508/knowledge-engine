import { Chunk } from "../types/chunks.type";

export function chunkText(text: string): Chunk[] {
    const chunkSize = 1000; // Define the size of each chunk
    const chunks: Chunk[] = [];
    let index = 0;
    for (let i = 0; i < text.length; i += chunkSize) {
        const chunk = text.slice(i, i + chunkSize);

        chunks.push({
            id: crypto.randomUUID(),
            text: chunk,
            metadata: {
                chunkIndex: index++,
                start: i,
                end: i + chunk.length,
                source: "pdf"
            }
        });
    }
    return chunks
}


// export function chunkParagraph(text: string): Chunk[] {
//     const paragraphs = text.split("\n\n");
//     const sentences = paragraphs?.split(/(?<=[.!?])\s+/);
//     const words = sentences.split(" ");
//     return paragraphs
// } 