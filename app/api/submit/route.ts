import { NextRequest } from "next/server";
import { spawn } from "child_process";


export async function POST(request: NextRequest) {
    const { code } = await request.json();
    const child = spawn("docker", ["run", "--rm", "-i", "bun-sandbox"]);

    let out = "";
    let err = "";

    child.stdin.write(code);
    child.stdin.end()

    child.stdout.on("data", (data) => {
        out += data.toString();
    });
    child.stderr.on("data", (data) => {
        err += data.toString();
    });

    await new Promise((resolve) => {
        child.on("close", resolve);
    });

    return new Response(JSON.stringify(out), {
        headers: { "Content-Type": "application/json" }
    });
}
