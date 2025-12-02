import { FunctionMetaDetails, ParameterType } from '@/types/recursion';
import React, { useState } from 'react'
import ts, { preProcessFile } from "typescript"




const useCodeParser = () => {

    const [functionMetaDetails, setFunctionMetaDetails] = useState<FunctionMetaDetails>({ functionName: "", params: [], returnVal: '' });

    const parseCode = (node: ts.Node, result: FunctionMetaDetails) => {
        if (ts.isFunctionDeclaration(node)) {
            result.params = node.parameters.map(p => ({
                key: p.name.getText(),
                keyType: p.type ? p.type.getText() : "any",
                parameterVal: ''
            }));
            result.functionName = node.name?.text ?? "(anonymous)";
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

    return {
        functionMetaDetails,
        setInputsParameterValue,
        setListOfParameters
    }
}

export default useCodeParser;
