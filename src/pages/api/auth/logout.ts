import { handleLogout } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default async function logout(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { from } = req.query;
    console.log("out_session:")
    console.log(from)
    await handleLogout(req, res, {
      returnTo: typeof from === "string" ? `/login?from=${from}` : "/",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
