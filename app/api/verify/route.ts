// app/api/verify/route.ts

import { verifyProof } from "zk-polka-sdk";
import path from "path";

export async function POST(req: Request) {
  try {
    const { birthYear } = await req.json();

    const circuitPath = path.resolve("./zk/birth"); // Folder containing .wasm, .zkey, etc.

    const result = await verifyProof({ birthYear }, circuitPath);
    console.log("ZK verification result:", result.publicSignals[0]);

    return new Response(JSON.stringify({ isValid: result.publicSignals[0] }), {
      status: 200,
    });
  } catch (err) {
    console.error("ZK verify error:", err);
    return new Response(JSON.stringify({ error: "Verification failed" }), {
      status: 500,
    });
  }
}
