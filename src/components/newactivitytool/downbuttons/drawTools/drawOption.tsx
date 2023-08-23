import Colorbox from "../../common/colorbox/colorbox";
import { DrawOptionContainer } from "./style";
import { CRAYON, ERASER, FELTPEN, ReducersType, SPRAY } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { drawActions } from "../../../../store/common/drawSlice";

export default function DrawOption() {
  const brushes = useSelector((state: ReducersType) => state.drawReducer);
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const dispatch = useDispatch();
  const select = useSelector((state: ReducersType) => state.drawReducer.now);

  const setColor = (color: string) => {
    dispatch(drawActions.setBrush({ name: select, color: color }));
    canvas.freeDrawingBrush.color = color;
  };

  // const setSize = (width: number) => {
  //   dispatch(
  //     drawActions.setBrush({ name: select, color: undefined, width: width })
  //   );
  //   canvas.freeDrawingBrush.width = width;
  // };

  const option = (brushes as any)[select ? select : CRAYON];

  return (
    <DrawOptionContainer onClick={(e) => e.stopPropagation()}>
      {select !== FELTPEN && select !== ERASER && (
        <Colorbox
          setColor={(color: string) => {
            setColor(color);
          }}
          option={option}
        />
      )}
    </DrawOptionContainer>
  );
}
