import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

async function saveUserToDatabase(name: string, email: string, hashedPassword: string) {
  const mongoURI = process.env.MONGODB_URI ?? 'mongodb+srv://pankaj:1322panku@cluster0.h4npmjo.mongodb.net/';
  const mongoCollection = "users";

  const client = new MongoClient(mongoURI);

  console.log("client", client)

  try {
    await client.connect();
    const database = client.db(process.env.MONGODB_DB);
    const collection = database.collection(mongoCollection);

    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      throw new Error('Email is already in use');
    }

    const newUser = { name, email, hashedPassword };
    await collection.insertOne(newUser);
  } finally {
    await client.close();
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed', isSignedUp: false});
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide name, email, and password', isSignedUp: false });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await saveUserToDatabase(name, email, hashedPassword);

    res.status(200).json({ message: 'Sign-up successful', isSignedUp: true });
  } catch (error:any) {
    console.error('Error during sign-up:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error', isSignedUp: false });
  }
}
