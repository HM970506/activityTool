import { fabricObjectType } from "../../../types";
export default function cropper(imageOrdy: fabricObjectType, frameOrdy: fabricObjectType): {
    cropX: number;
    cropY: number;
    width: number | undefined;
    height: number | undefined;
    left: number;
    top: number;
};
