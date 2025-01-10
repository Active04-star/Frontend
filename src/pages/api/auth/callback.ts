import { handleCallback } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default async function callback(req: NextApiRequest, res: NextApiResponse) {
  try {
    await handleCallback(req, res);
  } catch (error: any) {
    if (error.cause.errorDescription === "user is blocked") {
      return res.redirect(302, "/login?from=user_blocked");

    }

    console.error(error);
    res.status(500).json({ error: error });
  }
}
