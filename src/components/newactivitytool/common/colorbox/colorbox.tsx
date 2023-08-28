import { useDispatch, useSelector } from "react-redux";
import { SelectButton } from "../../style";
import { COLORS, ReducersType } from "../../types";
import { ColorContainer, Colorchip } from "./styled";
import { drawActions } from "../../../../store/common/drawSlice";

export default function Colorbox({ setColor }: { setColor: Function }) {
  const dispatch = useDispatch();
  const drawTools = useSelector((state: ReducersType) => state.drawReducer);
  const { now: select, before } = drawTools;

  console.log((brushes as any)[select]);
  return (
    <ColorContainer>
      {COLORS.map((value: string, key: number) => (
        <SelectButton key={`${select}color${key}`} color={value}>
          <Colorchip
            color={value}
            select={(brushes as any)[select].brush ? 1 : 0}
            onClick={() => {
              setColor(value);
              dispatch(drawActions.setNow(before));
            }}
          />
        </SelectButton>
      ))}
    </ColorContainer>
  );
}
