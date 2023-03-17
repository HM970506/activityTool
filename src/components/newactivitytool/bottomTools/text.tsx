import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SideButton } from "../style";
import { fabric } from "fabric";
import { nodeActions } from "../../../store/common/nodeSlice";
import { BIG, MIDIUM, SMALL, TEXT } from "../types";

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
    const textbox = new fabric.Textbox("왜 수정이 안되냐고", {
      ...node,
    });
    console.log(textbox);
    canvas.add(textbox);
    canvas.renderAll();
  };

  const test = () => {
    if (canvas.getActiveObject()) {
      canvas.getActiveObject().set("text", "이건 되나");
      canvas.renderAll();
      console.log(canvas.getActiveObject());
    }
  };

  return (
    <>
      <button onClick={test}>test</button>
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
