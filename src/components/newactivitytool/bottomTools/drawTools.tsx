import { useDispatch, useSelector } from "react-redux";
import { BottomButton } from "../style";
import { drawActions } from "../../../store/common/drawSlice";
import { DrawSample } from "./style";

export default function DrawToolsMenu() {
  const dispatch = useDispatch();
  const draws = useSelector((state: any) => state.drawReducer);

  const toolChange = (tool: string) => {
    dispatch(drawActions.toolChange(tool));
  };
  const sizeChange = (size: number) => {
    dispatch(drawActions.sizeChange(size));
  };

  return (
    <>
      <BottomButton
        select={draws.tool == "pencil" ? 1 : 0}
        onClick={() => {
          toolChange("pencil");
        }}
      >
        펜
      </BottomButton>
      <BottomButton
        select={draws.tool == "pencil2" ? 1 : 0}
        onClick={() => {
          toolChange("pencil2");
        }}
      >
        펜2
      </BottomButton>
      <BottomButton
        select={draws.tool == "heartPatten" ? 1 : 0}
        onClick={() => {
          toolChange("heartPatten");
        }}
      >
        패턴배경
      </BottomButton>
      <BottomButton
        select={draws.tool == "spray" ? 1 : 0}
        onClick={() => {
          toolChange("spray");
        }}
      >
        스프레이
      </BottomButton>

      <BottomButton
        select={draws.tool == "eraser" ? 1 : 0}
        onClick={() => toolChange("eraser")}
      >
        지우개
      </BottomButton>

      <button
        onClick={() =>
          sizeChange(draws.size < 100 ? draws.size + 5 : draws.size)
        }
      >
        크게!
      </button>
      <button
        onClick={() => sizeChange(draws.size > 5 ? draws.size - 5 : draws.size)}
      >
        작게!
      </button>

      <DrawSample size={draws.size} />
    </>
  );
}
