import { SelectButton } from "../../styles/style";
import { COLORS } from "../../types";
import { ColorContainer, Colorchip } from "./styled";

export default function Colorbox({
  setColor,
  keyName,
  option,
}: {
  setColor: Function;
  option: { color: string; size: number };
  keyName: string;
}) {
  const { color } = option;
  return (
    <ColorContainer className={"option"}>
      {COLORS.map((value: string, key: number) => (
        <SelectButton
          className={"option"}
          select={color === value ? 1 : 0}
          key={`${keyName}color${key}`}
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
