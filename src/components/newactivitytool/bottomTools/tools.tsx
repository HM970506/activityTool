import { useDispatch, useSelector } from "react-redux";
import { drawActions } from "../../../store/common/drawSlice";
import { nodeActions } from "../../../store/common/nodeSlice";
import selectSlice, { selectActions } from "../../../store/common/selectSlice";
import { Button, ToolBox } from "../style";

export default function ToolsMenu() {
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

  const nodeRemove = async () => {
    if (selectShapeIndex != null) {
      dispatch(selectActions.selectChange(null));
      dispatch(nodeActions.removeNodes(selectShapeIndex));
    }
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
      <Button onClick={nodeRemove}>지우기</Button>
      <button
        onClick={() => {
          toolChagne("PEN");
        }}
      >
        펜
      </button>
      <button
        onClick={() => {
          toolChagne("BRUSH");
        }}
      >
        붓
      </button>
      <button onClick={() => colorChange("black")}>검은색</button>
      <button onClick={() => colorChange("blue")}>파란색</button>
      <button onClick={() => sizeChange(20)}>큰 브러쉬</button>
      <button onClick={() => sizeChange(3)}>작은 브러쉬</button>
      <button onClick={() => toolChagne("ERASER")}>지우개</button>
    </>
  );
}