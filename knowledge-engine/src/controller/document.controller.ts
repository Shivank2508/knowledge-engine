import { Request, Response } from "express";
import { parserPdf } from "../ parsers/pdf.parsers";
import { chunkText } from "../services/chunk.service";
import { embededChunk, embedQuery } from "../services/embedding.service";
import { vectorStoreService } from "../services/vector-store.service";
import { GenberateAiKnowlege } from "../services/generation.service";

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
    const query = "Which states are covered under Akshaya Patra Wave 7.0?";

    const queryEmbedding = await embedQuery(query);

    const response = await GenberateAiKnowlege(queryEmbedding, query)

    return res.status(200).json({
        message: "uploaded succesfull",
        vector: queryEmbedding,
        response: response
    })

}