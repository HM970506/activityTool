import { fabric } from "fabric-with-erasing";
import { deleteProps } from "../common/deleteButton";

export default function fabricSetting() {
  fabric.Object.prototype.set({
    cornerColor: "black",
    selectionBorderColor: "black",
    erasable: true,
    hoverCursor: "default",
    selectable: false,
    hasBorders: false,
    isTouchSupported: true,
  });

  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    ...deleteProps,
  });
}
