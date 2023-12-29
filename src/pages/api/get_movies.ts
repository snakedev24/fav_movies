import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';

export async function getMovies(movieId = null) {
    const mongoURI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/';
    const mongoCollection = 'movies';
    const mongoDatabase = process.env.MONGODB_DB;
  
    const client = new MongoClient(mongoURI);
  
    try {
      await client.connect();
      const database = client.db(mongoDatabase);
      const collection = database.collection(mongoCollection);
  
      if (movieId) {
        const movie = await collection.findOne({ _id: new ObjectId(movieId) });
  
        if (!movie) {
          return null;
        }
  
        return [movie];
      } else {
        const movies = await collection.find({}).toArray();
  
        return movies;
      }
    } finally {
      await client.close();
    }
}
  
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const movies = await getMovies();

    return res.status(200).json({ movies });
  } catch (error) {
    console.error('Error fetching movies from MongoDB:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

  