import Colorbox from "../../common/colorbox";
import {
  SIZES,
  SizeContainer,
  Sizechip,
  SizechipBox,
} from "../../common/sizebox";
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
import { ReactComponent as Line1 } from "./svg/line/line1.svg";
import { ReactComponent as Line2 } from "./svg/line/line2.svg";
import { ReactComponent as Line3 } from "./svg/line/line3.svg";
import { ReactComponent as Line4 } from "./svg/line/line4.svg";
import { ReactComponent as Line5 } from "./svg/line/line5.svg";
import { ReactComponent as Spray1 } from "./svg/spray/spray1.svg";
import { ReactComponent as Spray2 } from "./svg/spray/spray2.svg";
import { ReactComponent as Spray3 } from "./svg/spray/spray3.svg";
import { ReactComponent as Spray4 } from "./svg/spray/spray4.svg";
import { ReactComponent as Spray5 } from "./svg/spray/spray5.svg";

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
    <DrawOptionContainer onClick={(e) => e.stopPropagation()}>
      <SizeContainer>
        <SizechipBox select={option.size === 1 ? 1 : 0} color={option.color}>
          <Sizechip
            color={option.size !== 1 ? option.color : ""}
            onClick={() => {
              sizeChange(1);
            }}
          >
            {keyName == SPRAY ? <Spray1 /> : <Line1 />}
          </Sizechip>
        </SizechipBox>
        <SizechipBox select={option.size === 5 ? 1 : 0} color={option.color}>
          <Sizechip
            color={option.size !== 5 ? option.color : ""}
            onClick={() => {
              sizeChange(5);
            }}
          >
            {keyName == SPRAY ? <Spray2 /> : <Line2 />}
          </Sizechip>
        </SizechipBox>
        <SizechipBox select={option.size === 10 ? 1 : 0} color={option.color}>
          <Sizechip
            color={option.size !== 10 ? option.color : ""}
            onClick={() => {
              sizeChange(10);
            }}
          >
            {keyName == SPRAY ? <Spray3 /> : <Line3 />}
          </Sizechip>
        </SizechipBox>
        <SizechipBox select={option.size === 15 ? 1 : 0} color={option.color}>
          <Sizechip
            color={option.size !== 15 ? option.color : ""}
            onClick={() => {
              sizeChange(15);
            }}
          >
            {keyName == SPRAY ? <Spray4 /> : <Line4 />}
          </Sizechip>
        </SizechipBox>
        <SizechipBox select={option.size === 20 ? 1 : 0} color={option.color}>
          <Sizechip
            color={option.size !== 20 ? option.color : ""}
            onClick={() => {
              sizeChange(20);
            }}
          >
            {keyName == SPRAY ? <Spray5 /> : <Line5 />}
          </Sizechip>
        </SizechipBox>
      </SizeContainer>

      <Colorbox setColor={colorChange} option={option} keyName={keyName} />
    </DrawOptionContainer>
  );
}
