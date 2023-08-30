import {
  ColorContainer,
  Colorchip,
  ColorchipButton,
  DrawOptionContainer,
  Tool,
} from "./style";
import {
  COLORS,
  CRAYON,
  ERASER,
  FELTPEN,
  ReducersType,
  SPRAY,
} from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { drawActions } from "../../../../store/common/drawSlice";

import { Color, getPath } from "./common";

export default function DrawOption() {
  const brushes = useSelector((state: ReducersType) => state.drawReducer);
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const dispatch = useDispatch();
  const { now: select, before } = useSelector(
    (state: ReducersType) => state.drawReducer
  );

  const nowColor =
    select === ERASER
      ? (brushes as any)[before].color
      : (brushes as any)[select].color;

  const setColor = async (color: string) => {
    const nowTool = select !== ERASER ? select : before;
    await dispatch(
      drawActions.setBrush({
        ...(brushes as any)[nowTool],
        name: nowTool,
        color: color,
      })
    );
    canvas.freeDrawingBrush.color = color;
  };

  return (
    <DrawOptionContainer id="drawOption" onClick={(e) => e.stopPropagation()}>
      <ColorContainer>
        {COLORS.map((value: string, key: number) => (
          <ColorchipButton
            key={`${select}color${key}`}
            id={`${select}color${key}`}
          >
            <Colorchip
              select={nowColor === value ? 1 : 0}
              color={value}
              onClick={() => {
                setColor(value);
                if (select === ERASER) dispatch(drawActions.setNow(before));
              }}
            >
              <Tool
                src={select !== ERASER ? getPath(select) : getPath(before)}
              />
              {select !== ERASER ? Color(select) : Color(before)}
            </Colorchip>
          </ColorchipButton>
        ))}
      </ColorContainer>
    </DrawOptionContainer>
  );
}
