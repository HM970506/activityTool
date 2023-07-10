import React from "react";
export default function Colorbox({ setColor, keyName, option, }: {
    setColor: Function;
    option: {
        color: string;
        size: number;
    };
    keyName: string;
}): React.JSX.Element;
