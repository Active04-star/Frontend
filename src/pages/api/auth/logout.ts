import { handleLogout } from "@auth0/nextjs-auth0";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";

export default async function logout(req: NextRequest, res: NextApiResponse) {
  try {
    await handleLogout(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
