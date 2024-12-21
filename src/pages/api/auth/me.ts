/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleProfile } from '@auth0/nextjs-auth0';

export default async function auth(req: any, res: any) {
  try {
    await handleProfile(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}