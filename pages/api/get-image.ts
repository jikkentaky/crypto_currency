import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import * as fs from "node:fs";
import {defaultPath} from "@/lib/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { url } = req.query;

  try {
    const response = await fetch(url);
    const contentType = response.headers.get('content-type');

    res.setHeader('Content-Type', contentType || 'image/png');

    return res.send(Buffer.from(await response.arrayBuffer()));
  } catch (error) {
    const standardImagePath = path.join(process.cwd(), 'public', defaultPath);

    try {
      const imageBuffer = fs.readFileSync(standardImagePath);
      res.setHeader('Content-Type', 'image/png');
      return res.send(imageBuffer);
    } catch (fsError) {
      return res.status(500).json({ error: 'Error reading standard image' })
    }
  }
}