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
    returnVal: any | null,
    functionName: string
}

// similar to FunctionCallStackType<T,R> but here children is different type which is use to show the function call made by each function call individuals use in the functionCallStack.tsx Component
export type SimpleFunctionCallStackType = {
    id: number,
    params: any[],
    children: number[],
    parent: null | number,
    returnVal: any,
}