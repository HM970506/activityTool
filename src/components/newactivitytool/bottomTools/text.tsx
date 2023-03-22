import { useDispatch, useSelector } from "react-redux";
import { SideButton } from "../style";
import { fabric } from "fabric";
import { BIG, MIDIUM, SMALL, TEXT } from "../types";
import { useEffect } from "react";

const editStart = (e: any) => {
  const textArea = document.createElement("textarea");
  textArea.style.width = e.target.width;
  textArea.style.height = e.target.height;
  textArea.style.left = e.target.left + "px";
  textArea.style.top = e.target.top + "px";
  textArea.style.fontSize = e.target.fontSize;
  textArea.value = e.target.text;

  console.log(e.target);
};

const editEnd = (e: any) => {};

export default function TextMenu() {
  const dispatch = useDispatch();

  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const defaultProps = {
    left: window.innerWidth / 2,
    top: window.innerHeight / 2,
    color: "black",
    width: 400,
    height: 30,
    fontSize: 10,
    editable: true,
  };

  const TextMaker = (size: number) => {
    const node = {
      ...defaultProps,
      fontSize: size,
    };

    const textbox = new fabric.Textbox("왜 수정이 안되지", {
      ...node,
    });

    textbox.selectable = true;
    textbox.__eventListeners["mousedblclick"] = []; //더블클릭시 단어 선택하던 함수
    textbox.__eventListeners["tripleclick"] = [];
    textbox.__eventListeners["mousedown"] = [];
    textbox.on("mousedblclick", editStart);
    //버그인 것 같으니 수정 버튼을 추가해서 임의로 수정모드에 들어가게 합시다.

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
