import "server-only";

import crypto from "node:crypto";
import { headers } from "next/headers";

export async function getHashedUserIpAddress(): Promise<string | null> {
  const userIpAddress = (await headers()).get("x-forwarded-for");

  if (!userIpAddress) {
    return null;
  }

  const hash = crypto.createHash("sha256");
  hash.update(userIpAddress || "");
  return hash.digest("hex");
}
