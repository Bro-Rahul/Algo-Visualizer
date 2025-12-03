export type FunctionCallStackType<T, R> = {
    id: number,
    children: FunctionCallStackType<T, R>[],
    parent: number | null,
    params: T,
    returnVal: R | null,
}

export type ParameterType = {
    key: string,
    keyType: string,
    parameterVal: string
}

export type FunctionMetaDetails = {
    params: ParameterType[],
    returnVal: any | null
    functionName: string
}

const template = `
const userFunction = function fibonacciDP(n: number, memo: number[]) {
    if (n <= 1) return n;
    memo[n] = wrapperFunction(n - 1, memo) + wrapperFunction(n - 2, memo);
    return memo[n];
};

type FunctionCallStackType<T, R> = {
    id: number,
    children: FunctionCallStackType<T, R>[],
    parent: number | null,
    params: T,
    returnVal: R | null,
};

class FunctionStateCapture<T extends (...args: any[]) => any> {
    states: FunctionCallStackType<Parameters<T>, ReturnType<T>>[] = [];
    stack: number[] = [];
    idCounter: number = 0;

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

const state = new FunctionStateCapture<typeof userFunction>();
const wrapperFunction = state.getWrapperfunction(userFunction);

const result = wrapperFunction(3, []);
const states = state.getFunctionCaptureStates();

export default { result, states };`
