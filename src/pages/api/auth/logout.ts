import { handleLogout } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default async function logout(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { out_session } = req.query;
    await handleLogout(req, res, {
      returnTo: typeof out_session === "string" ? `/login?from=${out_session}` : "/",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
