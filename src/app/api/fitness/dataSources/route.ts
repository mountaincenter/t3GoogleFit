import getServerSession from "next-auth";
import { authConfig } from "@/server/auth/config";
import type { NextApiRequest, NextApiResponse } from "next";

interface CustomSession {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = getServerSession(authConfig) as unknown as CustomSession;

  // セッションの存在を確認
  if (!session.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const userId = session.id; // セッションから安全にプロパティを取得
    res.status(200).json({ message: `User ID: ${userId}` });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
