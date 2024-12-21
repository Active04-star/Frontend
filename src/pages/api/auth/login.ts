<<<<<<< HEAD
import { handleLogin } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
=======
/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleLogin } from '@auth0/nextjs-auth0';

export default async function login(req: any, res: any) {
>>>>>>> fe28609bbca6d15884d37e407b238b7d653e4047
  try {
    await handleLogin(req, res, {
      returnTo: '/auth/redirect',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
