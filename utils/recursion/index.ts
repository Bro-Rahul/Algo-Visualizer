import { FunctionCallStackType, FunctionMetaDetails, ParameterType, SimpleFunctionCallStackType } from "@/types/recursion";
import ts from "typescript";


export class FunctionStateCapture<T extends (...args: any[]) => any> {

    states: FunctionCallStackType<Parameters<T>, ReturnType<T>>[];
    stack: number[];
    idCounter: number;

    constructor() {
        this.states = [];
        this.stack = [];
        this.idCounter = 0;
    }

    public getWrapperfunction(fun: T) {
        return (...args: Parameters<T>) => {
            const idx = this.idCounter++;
            this.stack.push(idx);

            this.states[idx] = {
                params: args,
                returnVal: null,
                id: idx,
                children: [],
                parent: null
            };

            const result = fun(...args);

            const top = this.stack.pop()!;
            this.states[top].returnVal = result;

            if (this.stack.length > 0) {
                const parent = this.stack[this.stack.length - 1];
                this.states[parent].children.push(this.states[top]);
                this.states[top].parent = parent;
            }

            return result;
        };
    }

    public getHierarchyData() {
        return this.states[0];
    }

    public getFunctionCaptureStates() {
        return this.states;
    }
}


export const parseCode = (node: ts.Node, result: FunctionMetaDetails) => {
    if (ts.isFunctionDeclaration(node)) {
        result.params = node.parameters.map(p => ({
            key: p.name.getText(),
            keyType: p.type ? p.type.getText() : "any",
            parameterVal: ''
        }));
        result.functionName = node.name?.text ?? "(anonymous)";
    }
    if (ts.isReturnStatement(node)) {

    }

    if (ts.isVariableDeclaration(node) && node.initializer && ts.isArrowFunction(node.initializer)) {

        const fn = node.initializer;

        result.params = fn.parameters.map(p => ({
            key: p.name.getText(),
            keyType: p.type ? p.type.getText() : "any",
            parameterVal: ''
        }));

        result.functionName = node.name.getText();

    }

    ts.forEachChild(node, child => parseCode(child, result));
};

export const getFormatedCode = (
    userCode: string,
    paramsList: ParameterType[],
    functionName: string
) => {
    const regex = new RegExp(functionName, "g");
    let matchIndex = 0;
    const updatedUserCode = userCode.replace(regex, match => {
        matchIndex++;
        return matchIndex === 1 ? match : "wrapperFunction";
    });

    const args = paramsList
        .map(item => JSON.stringify(JSON.parse(item.parameterVal)))
        .join(",");

    const template =
        `type FunctionCallStackType<T, R> = {
            id: number,
            children: FunctionCallStackType<T, R>[],
            parent: number | null,
            params: T,
            returnVal: R | null,
        };

        ${FunctionStateCapture.toString()}

        ${updatedUserCode};

        const state = new FunctionStateCapture<typeof ${functionName}>();
        const wrapperFunction = state.getWrapperfunction(${functionName});

        wrapperFunction(${args});

        console.log(JSON.stringify(state.getHierarchyData()));
        `;

    return template;
};

export const formateData = (hierarchyData: FunctionCallStackType<any, any>, result: SimpleFunctionCallStackType[]) => {
    result.push({
        ...hierarchyData,
        children: hierarchyData.children.map(item => item.id)
    })
    for (let i = 0; i < hierarchyData.children.length; i++) {
        formateData(hierarchyData.children[i], result);
    }
}

export const formateDataHerarchy = (hierarchyData: d3.HierarchyPointNode<FunctionCallStackType<any, any>>, result: FunctionCallStackType<any, any>[]) => {


}