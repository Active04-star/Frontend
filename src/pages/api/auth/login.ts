/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleLogin } from '@auth0/nextjs-auth0';

export default async function login(req: any, res: any) {
  try {
    await handleLogin(req, res, {
      returnTo: '/auth/redirect',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}