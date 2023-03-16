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
    canvas.add(new fabric.Textbox("내용을 입력하세요", { ...node }));
    canvas.renderAll();

    //노드목록에 저장
    dispatch(nodeActions.addNodes(node));
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
