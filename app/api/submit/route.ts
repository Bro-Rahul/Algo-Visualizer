import { NextRequest } from "next/server";
import { spawn } from "child_process";
import { FunctionStateCapture } from "@/utils/recursion";

const template = `
export type FunctionCallStackType<T, R> = {
    id: number,
    children: FunctionCallStackType<T, R>[],
    parent: number | null,
    params: T,
    returnVal: R | null,
}
${FunctionStateCapture.toString()}
function fibonacciDP(n: number): number {
    if (n <= 1) return n;
    return wrapperFunction(n - 1) + wrapperFunction(n - 2);
}
const state = new FunctionStateCapture<typeof fibonacciDP>();
const wrapperFunction = state.getWrapperfunction(fibonacciDP);
wrapperFunction(8)
console.log(JSON.stringify(state.getHierarchyData()))
`;

function formateCode(params: any[], userCode: string, functionName: string) {
    const template = `
export type FunctionCallStackType<T, R> = {
    id: number,
    children: FunctionCallStackType<T, R>[],
    parent: number | null,
    params: T,
    returnVal: R | null,
}
${FunctionStateCapture.toString()}
${userCode}
const state = new FunctionStateCapture<typeof ${functionName}>();
const wrapperFunction = state.getWrapperfunction(${functionName});
wrapperFunction()
console.log(JSON.stringify(state.getHierarchyData()))
`;
}

/*
    1 for the user function manipulated one,
    2 list of parameter values 
    3 function Name
*/

/* function fibonacciDP(n: number): number {
    if (n <= 1) return n;
    return fibonacciDP(n - 1) + fibonacciDP(n - 2);
}

const state = new FunctionStateCapture<typeof fibonacciDP>();
const wrapperFunction = state.getWrapperfunction(fibonacciDP);
wrapperFunction(8) */



export async function GET(request: NextRequest) {
    const child = spawn("docker", ["run", "--rm", "-i", "bun-sandbox"]);

    let out = "";
    let err = "";

    child.stdout.on("data", (data) => (out += data.toString()));
    child.stderr.on("data", (data) => (err += data.toString()));

    // Write code to child stdin
    child.stdin.write(template);
    child.stdin.end()

    // Wait for child process to finish
    await new Promise((resolve) => {
        child.on("close", resolve);
    });
    return new Response(out, {
        headers: { "Content-Type": "application/json" }
    });
}


export async function POST(request: NextRequest) {
    const { code } = await request.json();
    const child = spawn("docker", ["run", "--rm", "-i", "bun-sandbox"]);

    let out = "";
    let err = "";
    console.log(code)

    // Write code to child stdin
    child.stdin.write(code);
    child.stdin.end()

    child.stdout.on("data", (data) => {
        out += data.toString();
    });
    child.stderr.on("data", (data) => {
        err += data.toString();
    });



    // Wait for child process to finish
    await new Promise((resolve) => {
        child.on("close", resolve);
    });
    return new Response(JSON.stringify(out), {
        headers: { "Content-Type": "application/json" }
    });
}
