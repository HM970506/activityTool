import { Button, SideButton, SideButtonBox } from "../style";
import { nodeActions } from "../../../store/common/nodeSlice";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../../store/common/categorySlice";
import { BIG, MIDIUM, SMALL } from "../types";
import { TEXT } from "../types";

export default function TextButton() {
  const dispatch = useDispatch();
  const nowCategory = useSelector(
    (state: any) => state.categoryReducer.category
  );

  const addTextNodes = (size: number) => {
    dispatch(
      nodeActions.addNodes({
        type: TEXT,
        shapeProps: {
          fontSize: size,
          scaleX: 1,
          scaleY: 1,
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          text: "내용을 입력하세요",
          width: 210,
          height: 30,
        },
      })
    );
  };

  const textButtonClick = () => {
    dispatch(categoryActions.categoryChange(TEXT));
  };

  return (
    <>
      {nowCategory === TEXT && (
        <SideButtonBox>
          <SideButton
            size={BIG}
            onClick={() => {
              addTextNodes(BIG);
            }}
          >
            큰 글자
          </SideButton>
          <SideButton
            onClick={() => {
              addTextNodes(MIDIUM);
            }}
            size={MIDIUM}
          >
            중간 글자
          </SideButton>
          <SideButton
            onClick={() => {
              addTextNodes(SMALL);
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
