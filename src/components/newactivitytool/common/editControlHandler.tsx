import { canvasType } from "../types";

export default function editControlHandler(canvas: canvasType) {
  console.log("선택했어요");
  const now = canvas.getActiveObject();
  if (now.controls.editControl) {
    console.log("에딧컨트롤이 있어요");
    console.log(now);
    if (now.objectType === "photo") {
      console.log("포토에요");
      //  console.log(now.controls.editControl);
      now.controls.editControl.visible = true;
    } else now.controls.editControl.visible = false;
    canvas.renderAll();
  }
}
