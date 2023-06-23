import { canvasType } from "../types";

//내일은 fabric을 뜯어서 image에서 확장된 photo타입을 따로 만듭시다~
//히스토리를 뜯어보는게 더 낫지 않으려나? 히스토리를 먼저 뜯어봅시다

export default function editControlHandler(canvas: canvasType) {
  const now = canvas.getActiveObject();
  if (now.controls.editControl) {
    if (now.src.s(";")[0] === "data:image/jpeg" || now.objectType === "photo") {
      console.log("포토에요");
      //  console.log(now.controls.editControl);
      now.controls.editControl.visible = true;
    } else now.controls.editControl.visible = false;
    canvas.renderAll();
  }
}
