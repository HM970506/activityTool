import { fabric } from "fabric-with-erasing";
import { deleteProps } from "../setting/deleteButton";

export default function fabricSetting() {
  if (fabric.Object.prototype.controls.deleteControl == null) {
    fabric.Object.prototype.cornerColor = "black";
    fabric.Object.prototype.selectionBorderColor = "black";
    fabric.Object.prototype.erasable = true;
    fabric.Object.prototype.hoverCursor = "default";
    fabric.Object.prototype.selectable = false;
    fabric.Object.prototype.hasBorders = false;

    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
      ...deleteProps,
    });
  }
}
