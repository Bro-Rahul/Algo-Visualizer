import { getQuickJS } from "quickjs-emscripten";
import ts from "typescript";

export function checkTSErrors(code: string) {
    const fileName = "user.ts";

    // Create an in-memory compiler host
    const compilerHost = ts.createCompilerHost({}, true);

    compilerHost.getSourceFile = (file, languageVersion) => {
        if (file === fileName) {
            return ts.createSourceFile(fileName, code, languageVersion, true, ts.ScriptKind.TS);
        }
        return undefined;
    };

    compilerHost.readFile = () => code;

    const program = ts.createProgram(
        [fileName],
        {
            noEmit: true,      // don’t generate JS yet
            strict: true,      // enable strict type checking
            target: ts.ScriptTarget.ESNext,
            module: ts.ModuleKind.ESNext
        },
        compilerHost
    );

    // Get all diagnostics (syntax + type errors)
    const diagnostics = ts.getPreEmitDiagnostics(program);
    // Format diagnostics
    return diagnostics[0].messageText
}

export async function POST(request: Request) {
    const { code } = await request.json();
    return new Response(JSON.stringify(checkTSErrors(code)))
}

