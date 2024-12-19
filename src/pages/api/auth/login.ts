import { handleLogin } from '@auth0/nextjs-auth0';

export default async function login(req, res) {
  try {
    // await handleLogin(req, res);
    await handleLogin(req, res, {
      returnTo: '/auth/redirect',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}