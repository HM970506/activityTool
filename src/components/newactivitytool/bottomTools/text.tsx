import { useDispatch, useSelector } from "react-redux";
import { SideButton } from "../style";
import { fabric } from "fabric";
import { BIG, MIDIUM, SMALL, TEXT } from "../types";
import { deleteProps } from "../setting/deleteButton";

export default function TextMenu() {
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const textAreaContainer = useSelector(
    (state: any) => state.nodeReducer.textareaContainer
  );

  fabric.Textbox.prototype.set({
    cornerColor: "black",
    selectionBorderColor: "black",
  });
  fabric.Textbox.prototype.controls.deleteControl = new fabric.Control({
    ...deleteProps,
  });

  const TextMaker = (font: string) => {
    const textbox = new fabric.Textbox("텍스트를 입력하세요", {
      left: window.innerWidth / 2,
      top: window.innerHeight / 2,
      color: "black",
      width: 400,
      height: 30,
      editable: true,
      fontSize: 30,
      selectable: true,
      hiddenTextareaContainer: textAreaContainer,
      fontFamily: font,
    });
    canvas.add(textbox);
    canvas.renderAll();
  };

  return (
    <>
      <SideButton
        font={"굴림체"}
        onClick={() => {
          TextMaker("굴림체");
        }}
      >
        굴림체
      </SideButton>
      <SideButton
        font={"궁서체"}
        onClick={() => {
          TextMaker("궁서체");
        }}
      >
        궁서체
      </SideButton>
      <SideButton
        font={"바탕체"}
        onClick={() => {
          TextMaker("바탕체");
        }}
      >
        바탕체
      </SideButton>
    </>
  );
}
