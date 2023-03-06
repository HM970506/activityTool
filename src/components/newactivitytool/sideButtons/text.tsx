import { Button, SideButton, SideButtonBox } from "../style";
import { nodeActions } from "../../../store/common/nodeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { categoryActions } from "../../../store/common/categorySlice";
import { BIG, MIDIUM, SMALL } from "./types";

export default function TextButton() {
  const dispatch = useDispatch();
  const nowCategory = useSelector(
    (state: any) => state.categoryReducer.category
  );

  const addNodes = (size: number) => {
    dispatch(
      nodeActions.addNodes({
        type: "TEXT",

        shapeProps: {
          fontSize: size,
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          text: "내용을 입력하세요",
        },
      })
    );
  };

  return (
    <>
      {nowCategory === "TEXT" && (
        <SideButtonBox>
          <SideButton
            size={BIG}
            onClick={() => {
              addNodes(BIG);
            }}
          >
            큰 글자
          </SideButton>
          <SideButton
            onClick={() => {
              addNodes(MIDIUM);
            }}
            size={MIDIUM}
          >
            중간 글자
          </SideButton>
          <SideButton
            onClick={() => {
              addNodes(SMALL);
            }}
            size={SMALL}
          >
            작은 글자
          </SideButton>
        </SideButtonBox>
      )}
      <Button
        onClick={() => {
          dispatch(categoryActions.categoryChange("TEXT"));
        }}
      >
        글상자
      </Button>
    </>
  );
}
