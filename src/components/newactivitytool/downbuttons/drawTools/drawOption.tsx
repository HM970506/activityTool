import Colorbox from "../../common/colorbox/colorbox";
import { Sizechip, SizechipBox } from "../../common/sizebox";
import { DrawOptionContainer } from "./style";
import { CRAYON, ERASER, FELTPEN, ReducersType, SPRAY } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { drawActions } from "../../../../store/common/drawSlice";

export default function DrawOption({ nowTool }: { nowTool: string }) {
  const brushes = useSelector((state: ReducersType) => state.drawReducer);
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const dispatch = useDispatch();
  const select = useSelector((state: ReducersType) => state.drawReducer.now);

  const setColor = (color: string) => {
    dispatch(
      drawActions.setBrush({ name: nowTool, color: color, width: undefined })
    );
    canvas.freeDrawingBrush.color = color;
  };

  const setSize = (width: number) => {
    dispatch(
      drawActions.setBrush({ name: nowTool, color: undefined, width: width })
    );
    canvas.freeDrawingBrush.width = width;
  };

  const option = (brushes as any)[select ? select : CRAYON];

  return (
    <DrawOptionContainer onClick={(e) => e.stopPropagation()}>
      {nowTool !== FELTPEN && nowTool !== ERASER && (
        <Colorbox
          setColor={(color: string) => {
            setColor(color);
          }}
          option={option}
          nowTool={nowTool}
        />
      )}
    </DrawOptionContainer>
  );
}
