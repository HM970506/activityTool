import { useDispatch, useSelector } from "react-redux";
import { drawActions } from "../../../store/common/drawSlice";
import { ColorContainer, Colorchip } from "./style";
import { COLORS } from "../types";

export default function Colorbox() {
  const dispatch = useDispatch();

  const colorChange = (color: string) => {
    dispatch(drawActions.colorChange(color));
  };
  const color = useSelector((state: any) => state.drawReducer.color);

  return (
    <ColorContainer>
      {COLORS.map((value: string, key: number) => (
        <Colorchip
          select={color == value ? 1 : 0}
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
