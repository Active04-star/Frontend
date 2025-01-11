import { handleLogin } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from 'cookie';
import { API_URL } from "@/config/config";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {

    const cookie = serialize('to', 'login', {
      httpOnly: true,
      secure: false, //API_URL !== 'http://localhost:4000',
      maxAge: 60 * 60,
      path: '/',
      sameSite: 'strict',
    });
    console.log("PASO POR AQUI");
    res.setHeader('Set-Cookie', cookie);

    const { login_hint } = req.query;

    await handleLogin(req, res, {
      authorizationParams: {
        // state: "custom-state",
        login_hint: typeof login_hint !== 'string' ? '' : login_hint,
        prompt: "select_account"
      },
      returnTo: '/auth/redirect',
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", _error: error });
  }
}
