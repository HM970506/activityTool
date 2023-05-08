import { useDispatch, useSelector } from "react-redux";
import { drawActions } from "../../../store/common/drawSlice";
import { ColorContainer, Colorchip } from "../styles/bottomToolstyle";
import { COLORS, ReducersType } from "../types";

export default function Colorbox() {
  const dispatch = useDispatch();
  const color = useSelector((state: ReducersType) => state.drawReducer.color);

  const colorChange = (color: string) => {
    dispatch(drawActions.colorChange(color));
  };

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
