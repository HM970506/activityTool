import { useSelector } from "react-redux";
import { SelectButton } from "../../style";
import { COLORS, ReducersType } from "../../types";
import { ColorContainer, Colorchip } from "./styled";

export default function Colorbox({
  setColor,
  option,
}: {
  setColor: Function;
  option: { color: string; size: number };
}) {
  const { color } = option;
  const select = useSelector((state: ReducersType) => state.drawReducer.now);
  return (
    <ColorContainer className={"option"}>
      {COLORS.map((value: string, key: number) => (
        <SelectButton
          className={"option"}
          select={color === value ? 1 : 0}
          key={`${select}color${key}`}
          color={value}
        >
          <Colorchip
            className={"option"}
            select={color === value ? 1 : 0}
            color={value}
            onClick={() => {
              setColor(value);
            }}
          />
        </SelectButton>
      ))}
    </ColorContainer>
  );
}
