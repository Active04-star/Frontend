/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleLogout } from '@auth0/nextjs-auth0';

export default async function logout(req: any, res: any) {
  try {
    await handleLogout(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}