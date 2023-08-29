import { useDispatch, useSelector } from "react-redux";
import { SelectButton } from "../../style";
import { COLORS, ERASER, ReducersType } from "../../types";
import { ColorContainer, Colorchip } from "./styled";
import { drawActions } from "../../../../store/common/drawSlice";

export default function Colorbox({ setColor }: { setColor: Function }) {
  const dispatch = useDispatch();
  const brushes = useSelector((state: ReducersType) => state.drawReducer);
  const { now: select, before } = brushes;

  const nowColor =
    select === ERASER
      ? (brushes as any)[before].color
      : (brushes as any)[select].color;

  console.log((brushes as any)[select], nowColor);
  return (
    <ColorContainer id="Colorbox">
      {COLORS.map((value: string, key: number) => (
        <SelectButton key={`${select}color${key}`} color={value}>
          <Colorchip
            color={value}
            select={nowColor === value ? 1 : 0}
            onClick={() => {
              setColor(value);
              if (select === ERASER) dispatch(drawActions.setNow(before));
            }}
          />
        </SelectButton>
      ))}
    </ColorContainer>
  );
}
