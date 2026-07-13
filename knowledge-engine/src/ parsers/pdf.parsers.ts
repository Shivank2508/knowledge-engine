import fs from "node:fs/promises";
import { PDFParse } from "pdf-parse";
import path from "node:path";
import { cleanText } from "../services/text-cleaner.service";

export async function parserPdf(filepath: string) {
    const buffer = await fs.readFile(filepath);

    const parser = new PDFParse({
        data: buffer,
    });

    const result = await parser.getText();
    const cleaned = cleanText(result.text);
    return {
        text: cleaned,
        metadata: {
            pages: result.total,
            source: filepath,
            fileName: path.basename(filepath),
        },
    };
}