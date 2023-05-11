import Colorbox from "../../bottomTools/colorbox";
import SizeBox from "../../bottomTools/sizebox";
import { DrawOptionContainer } from "./style";
import {
  BACKGROUND_BRUSH,
  ERASER,
  PENCIL,
  ReducersType,
  SPRAY,
} from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { drawActions } from "../../../../store/common/drawSlice";

export default function DrawOption({ keyName }: { keyName: string }) {
  const { pencil, back, spray, eraser } = useSelector(
    (state: ReducersType) => state.drawReducer
  );
  const dispatch = useDispatch();

  const sizeChange = (size: number) => {
    if (keyName === PENCIL)
      dispatch(drawActions.setPencil({ color: pencil.color, size: size }));
    else if (keyName === BACKGROUND_BRUSH)
      dispatch(
        drawActions.setBackgroundBrush({ color: back.color, size: size })
      );
    else if (keyName === SPRAY)
      dispatch(drawActions.setSpray({ color: spray.color, size: size }));
    else if (keyName === ERASER)
      dispatch(drawActions.setEraser({ color: eraser.color, size: size }));
  };
  const colorChange = (color: string) => {
    if (keyName === PENCIL)
      dispatch(drawActions.setPencil({ color: color, size: pencil.size }));
    else if (keyName === BACKGROUND_BRUSH)
      dispatch(
        drawActions.setBackgroundBrush({ color: color, size: back.size })
      );
    else if (keyName === SPRAY)
      dispatch(drawActions.setSpray({ color: color, size: spray.size }));
  };

  const option =
    keyName === PENCIL
      ? pencil
      : keyName === SPRAY
      ? spray
      : keyName === BACKGROUND_BRUSH
      ? back
      : eraser;

  return (
    <DrawOptionContainer
      className={"option"}
      onClick={(e) => e.stopPropagation()}
    >
      <SizeBox setSize={sizeChange} option={option} keyName={keyName} />
      <Colorbox setColor={colorChange} option={option} keyName={keyName} />
    </DrawOptionContainer>
  );
}
