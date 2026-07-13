import { Request, Response } from "express";
import { parserPdf } from "../ parsers/pdf.parsers";
import { chunkText } from "../services/chunk.service";
import { embededChunk, embedQuery } from "../services/embedding.service";
import { vectorStoreService } from "../services/vector-store.service";

export const uploadDocument = async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({
            message: "No file uploaded",
        })
    }
    const parser = await parserPdf(req.file.path)
    const chunks = chunkText(parser.text);
    const embedded = await embededChunk(chunks);

    // const vector = await vectorStoreService.addDocuments(embedded)
    const query = "What is Akshaya Patra Wave 7.0?";

    const queryEmbedding = await embedQuery(query);

    const searchDoc = await vectorStoreService.searchDocuments(queryEmbedding);
    return res.status(200).json({
        message: "uploaded succesfull",
        vector: searchDoc,
    })

}