import { useDispatch, useSelector } from "react-redux";
import { ColorContainer, Colorchip } from "../styles/bottomToolstyle";
import { COLORS, ReducersType } from "../types";

export default function Colorbox({ colorChange }: { colorChange: Function }) {
  const color = "";
  return (
    <ColorContainer>
      {COLORS.map((value: string, key: number) => (
        <Colorchip
          select={color === value ? 1 : 0}
          color={value}
          key={key}
          onClick={() => {
            colorChange(value);
          }}
        />
      ))}
    </ColorContainer>
  );
}
