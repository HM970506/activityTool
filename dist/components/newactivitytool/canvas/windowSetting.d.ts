import { Dispatch } from "@reduxjs/toolkit";
import { canvasType } from "../types";
export default function windowSetting(canvas: canvasType, dispatch: Dispatch<{
    payload: number;
    type: "zoomReducer/setZoom";
} | {
    payload: number;
    type: "zoomReducer/setScale";
}>): void;
