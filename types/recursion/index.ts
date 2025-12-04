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
