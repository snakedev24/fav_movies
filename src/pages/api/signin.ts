import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function findUserByEmail(email: string) {
  const mongoURI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/';
  const mongoCollection = 'users';

  const client = new MongoClient(mongoURI);

  try {
    await client.connect();
    const database = client.db(process.env.MONGODB_DB);
    const collection = database.collection(mongoCollection);

    const user = await collection.findOne({ email });
    return user;
  } finally {
    await client.close();
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const Key:any = process.env.SECRET_KEY

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed', isLogged: false });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password', isLogged: false });
  }

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password', isLogged: false });
    }

    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password', isLogged: false });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, Key, { expiresIn: '1h' });

    res.status(200).json({ message: 'Sign-in successful', isLogged: true, token});
  } catch (error:any) {
    console.error('Error during sign-in:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error', isLogged: false });
  }
}
