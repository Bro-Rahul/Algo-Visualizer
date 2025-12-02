import { FunctionCallStackType } from "@/types/recursion";



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
    public getParameterType() {
        return
    }
}


export const getFunctionMetaDetails = <T extends (...args: any[]) => any>(fn: T, capturedStateValues: FunctionCallStackType<Parameters<typeof fn>, ReturnType<typeof fn>>) => {

}