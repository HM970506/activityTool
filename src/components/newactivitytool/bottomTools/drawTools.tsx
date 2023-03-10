import { useDispatch, useSelector } from "react-redux";
import { drawActions } from "../../../store/common/drawSlice";
import { nodeActions } from "../../../store/common/nodeSlice";
import { BottomButton } from "../style";
import { BRUSH, PEN } from "../types";

export default function DrawToolsMenu() {
  const dispatch = useDispatch();
  const selectShapeIndex = useSelector(
    (state: any) => state.selectReducer.select
  );
  const toolChagne = (tool: string) => {
    dispatch(drawActions.toolChange(tool));
  };

  const sizeChange = (size: number) => {
    dispatch(drawActions.sizeChange(size));
  };

  const colorChange = (color: string) => {
    if (selectShapeIndex == null) dispatch(drawActions.colorChange(color));
    else {
      dispatch(
        nodeActions.modifyNodes({
          index: selectShapeIndex,
          modifyProps: { fill: color },
        })
      );
    }
  };

  return (
    <>
      <BottomButton
        onClick={() => {
          toolChagne(PEN);
        }}
      >
        펜
      </BottomButton>
      <BottomButton
        onClick={() => {
          toolChagne(BRUSH);
        }}
      >
        붓
      </BottomButton>
      <BottomButton
        onClick={() => {
          toolChagne("STAMP");
        }}
      >
        도장
      </BottomButton>
      <BottomButton onClick={() => colorChange("black")}>검은색</BottomButton>
      <BottomButton onClick={() => colorChange("blue")}>파란색</BottomButton>
      <BottomButton onClick={() => sizeChange(20)}>큰 브러쉬</BottomButton>
      <BottomButton onClick={() => sizeChange(3)}>작은 브러쉬</BottomButton>
      <BottomButton onClick={() => toolChagne("ERASER")}>지우개</BottomButton>
    </>
  );
}
