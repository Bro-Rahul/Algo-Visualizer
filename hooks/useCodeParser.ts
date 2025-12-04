import { FunctionCallStackType, FunctionMetaDetails, ParameterType } from '@/types/recursion';
import { getFormatedCode, parseCode } from '@/utils/recursion';
import { useRef, useState } from 'react'
import ts from "typescript"




const useCodeParser = () => {
    const [functionMetaDetails, setFunctionMetaDetails] = useState<FunctionMetaDetails>({ functionName: "", params: [], returnVal: '' });
    const svgRef = useRef<SVGSVGElement | null>(null);
    // typecasting to any as we can't get the exact types as we do not have the actula user function in the code 
    const [recursionData, setRecursionData] = useState<FunctionCallStackType<any, any> | null>(null);


    const setListOfParameters = (code: string) => {
        const result: FunctionMetaDetails = {
            functionName: '',
            params: [],
            returnVal: null
        };

        const node = ts.createSourceFile(
            "inline.ts",
            code,
            ts.ScriptTarget.Latest,
            true
        );
        parseCode(node, result);
        setFunctionMetaDetails(pre => ({
            ...result
        }));
    }

    const setInputsParameterValue = (idx: number, val: string) => {
        setFunctionMetaDetails(pre => ({
            ...pre,
            params: pre.params.map((param, index) => idx !== index ? param : {
                ...pre.params[idx],
                parameterVal: val
            })
        }))
    }

    const setResults = async (result: FunctionCallStackType<any, any>) => {
        setRecursionData(pre => result);
    }

    return {
        svgRef,
        functionMetaDetails,
        recursionData,
        setResults,
        setInputsParameterValue,
        setListOfParameters
    }
}

export default useCodeParser;
