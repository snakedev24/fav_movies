import { NextApiRequest, NextApiResponse } from "next";
import { getMovies } from "../get_movies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const movieId: any = req.query.id;

  if (!movieId) {
    return res.status(400).json({ message: "Movie ID is missing" });
  }

  try {
    const movies = await getMovies(movieId);
    if (!movies) {
      return res.status(404).json({ message: "Movie not found" });
    }
    return res.status(200).json({ movies });
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
