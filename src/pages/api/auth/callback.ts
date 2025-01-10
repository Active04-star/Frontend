import { handleCallback } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

interface CustomError extends Error {
  cause?: {
    errorDescription?: string;
  };
}

export default async function callback(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await handleCallback(req, res);
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      (error as CustomError).cause?.errorDescription === "user is blocked"
    ) {
      return res.redirect(302, "/login?from=user_blocked");
    }

    console.error(error);
    res.status(500).json({ error });
  }
}
