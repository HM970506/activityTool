import { canvasType } from "../types";

export default function editControlHandler(canvas: canvasType) {
  const now = canvas.getActiveObject();
  if (now.controls.editControl) {
    console.log(now.objectType);
    if (now.objectType == "photo") {
      now.controls.editControl.visible = true;
    } else now.controls.editControl.visible = false;
  }
}
