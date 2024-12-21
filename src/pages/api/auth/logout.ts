<<<<<<< HEAD
import { handleLogout } from "@auth0/nextjs-auth0";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";

export default async function logout(req: NextRequest, res: NextApiResponse) {
=======
/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleLogout } from '@auth0/nextjs-auth0';

export default async function logout(req: any, res: any) {
>>>>>>> fe28609bbca6d15884d37e407b238b7d653e4047
  try {
    await handleLogout(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
