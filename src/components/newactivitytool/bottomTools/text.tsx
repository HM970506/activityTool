import { useDispatch, useSelector } from "react-redux";
import { SideButton } from "../style";
import { fabric } from "fabric";
import { BIG, MIDIUM, SMALL, TEXT } from "../types";
import { useEffect } from "react";

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
    console.log(textbox);
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
