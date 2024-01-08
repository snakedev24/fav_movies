import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { IncomingForm } from "formidable";
import path from "path";
import formidable from "formidable";

import { promises as fsPromises } from "fs";

const { writeFile } = fsPromises;

async function createMovie(movieData: {
  title: string;
  year: string;
  imageUrl: string;
}) {
  const mongoURI = process.env.MONGODB_URI ?? "mongodb+srv://pankaj:1322panku@cluster0.h4npmjo.mongodb.net/";
  const mongoCollection = "movies";
  const mongoDatabase = process.env.MONGODB_DB;

  const client = new MongoClient(mongoURI);

  try {
    await client.connect();
    const database = client.db(mongoDatabase);
    const collection = database.collection(mongoCollection);

    await collection.insertOne(movieData);
  } finally {
    await client.close();
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const form = new IncomingForm();

  form.parse(req, async (err: any, fields: any, files: any) => {
    if (err) {
      console.error("Error parsing form data:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
    const year = Array.isArray(fields.year) ? fields.year[0] : fields.year;

    if (!title || !year) {
      return res
        .status(400)
        .json({ message: "Please provide title, year, and imageUrl" });
    }

    const imageUrl: any = files.imageUrl[0] as formidable.File;

    if (!title || !year || !imageUrl) {
      return res
        .status(400)
        .json({ message: "Please provide title, year, and imageUrl" });
    }

    const buffer = await fsPromises.readFile(imageUrl.filepath);
    const filename = Date.now() + imageUrl.originalFilename.replaceAll(" ", "_");
    const imagePath = path.join(process.cwd(), "public/uploads", filename);

    await writeFile(imagePath, buffer);

    await createMovie({ title, year, imageUrl: `/uploads/${filename}` });

    res.status(201).json({ message: "Movie created successfully" });
  });
}
