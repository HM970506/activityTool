import { Dispatch, SetStateAction } from "react";
import React from "react";
export default function Record({ state, setState, }: {
    state: string;
    setState: Dispatch<SetStateAction<string>>;
}): React.JSX.Element;
