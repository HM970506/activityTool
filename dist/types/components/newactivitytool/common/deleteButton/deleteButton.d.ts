import { Transform } from "fabric/fabric-impl";
export declare const deleteProps: {
    x: number;
    y: number;
    cursorStyle: string;
    mouseUpHandler: (e: MouseEvent, transform: Transform) => void;
    render: (ctx: CanvasRenderingContext2D, left: number, top: number) => void;
    cornerSize: number;
};
