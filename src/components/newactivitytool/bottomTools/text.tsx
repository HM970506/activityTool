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

  const TextMaker = (size: number) => {
    const textbox = new fabric.Textbox("텍스트를 입력하세요", {
      left: window.innerWidth / 2,
      top: window.innerHeight / 2,
      color: "black",
      width: 400,
      height: 30,
      editable: true,
      // cornerColor: "black",
      fontSize: size,
      selectable: true,
      hiddenTextareaContainer: textAreaContainer,
    });
    canvas.add(textbox);
    canvas.renderAll();
  };

  return (
    <>
      <SideButton
        size={BIG}
        onClick={() => {
          TextMaker(BIG);
        }}
      >
        큰 글자
      </SideButton>
      <SideButton
        onClick={() => {
          TextMaker(MIDIUM);
        }}
        size={MIDIUM}
      >
        중간 글자
      </SideButton>
      <SideButton
        onClick={() => {
          TextMaker(SMALL);
        }}
        size={SMALL}
      >
        작은 글자
      </SideButton>
    </>
  );
}
