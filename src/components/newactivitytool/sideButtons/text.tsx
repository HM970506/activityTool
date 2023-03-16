import { Button, SideButton, SideButtonBox } from "../style";
import { nodeActions } from "../../../store/common/nodeSlice";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../../store/common/categorySlice";
import { BIG, MIDIUM, SMALL } from "../types";
import { TEXT } from "../types";
import { fabric } from "fabric";
import { useState } from "react";

export default function TextButton() {
  const dispatch = useDispatch();
  const nowCategory = useSelector(
    (state: any) => state.categoryReducer.category
  );

  const [text, setText] = useState<string>("내용을 입력하세요");
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);

  const TextMaker = (size: number) => {
    const defaultProps = {
      left: window.innerWidth / 2,
      top: window.innerHeight / 2,
      color: "black",
      width: 400,
      height: 30,
      fontSize: 10,
      editable: true,
    };

    //캔버스에 추가
    canvas.add(
      new fabric.Textbox("내용을 입력하세요", {
        ...defaultProps,
        fontSize: size,
      })
    );
    canvas.renderAll();

    //노드목록에 저장
    dispatch(
      nodeActions.addNodes({
        type: TEXT,
        shapeProps: {
          ...defaultProps,
          fontSize: size,
        },
      })
    );
  };

  const textButtonClick = () => {
    if (nowCategory) dispatch(categoryActions.categoryChange(TEXT));
  };

  return (
    <>
      {nowCategory === TEXT && (
        <SideButtonBox>
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
        </SideButtonBox>
      )}
      <Button onClick={textButtonClick}>글상자</Button>
    </>
  );
}
