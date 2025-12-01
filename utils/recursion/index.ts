import { FunctionCallStackType, FuntionSignatureType } from "@/types/recursion";


export class FunctionStateCapture<T, R> {
    states: FunctionCallStackType<T, R>[];
    stack: number[];
    idCounter: number;

    constructor() {
        this.states = [];
        this.stack = [];
        this.idCounter = 0;
    }

    public withfunctionStates(fun: FuntionSignatureType<T, R>) {
        return (args: T) => {
            const idx = this.idCounter++;
            this.stack.push(idx);

            this.states[idx] = {
                params: args,
                returnVal: null,
                id: idx,
                children: [],
                parent: null
            };

            const result = fun(args);

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

    public getStateVal() {
        return this.states;
    }
}

function fib(num: number): number {
    if (num <= 1) return num;
    return fib(num - 1) + fib(num - 2);
}
type ParamsType = Parameters<typeof fib>
type ReturnValType = ReturnType<typeof fib>

const state = new FunctionStateCapture<ParamsType, ReturnValType>()


/* 
// 1. SIMPLIFIED GENERIC CONSTRAINT
// T must be constrained only to a function type.
export class FunctionStateCapture<T extends (...args: any[]) => any> {

    // 2. Use Parameters<T> and ReturnType<T> to define state arrays
    states: FunctionCallStackType<Parameters<T>, ReturnType<T>>[];
    stack: number[];
    idCounter: number;

    constructor() {
        this.states = [];
        this.stack = [];
        this.idCounter = 0;
    }

    // 3. The wrapped function accepts a Parameters<T> tuple
    public withfunctionStates(fun: T) {
        return (...args: Parameters<T>) => { // args is the tuple [num, memo]
            const idx = this.idCounter++;
            this.stack.push(idx);

            this.states[idx] = {
                params: args,
                returnVal: null,
                id: idx,
                children: [],
                parent: null
            };

            // Call the original function using the spread operator on the tuple
            const result = fun(...args);

            // ... (Rest of state capture logic remains the same)
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

    // This method is redundant/incorrectly defined, but keeping the signature fix
    public getFun(fn: T, args: Parameters<T>) {
        // You likely meant to call the wrapped function here, e.g.,
        // return this.withfunctionStates(fn)(args);
        this.withfunctionStates(fn)
    }

    public getStateVal() {
        return this.states;
    }

} */

