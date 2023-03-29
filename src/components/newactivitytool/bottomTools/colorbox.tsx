import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { drawActions } from "../../../store/common/drawSlice";

const COLORS = [
  "black",
  "blue",
  "red",
  "pink",
  "purple",
  "grey",
  "green",
  "yellow",
  "skyblue",
  "white",
];

const ColorContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  gap: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  position: relative;
  top: -10px;
`;

const Colorchip = styled.button<{ color: string }>`
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 100%;

  background-color: ${(props) => {
    return props.color;
  }};
`;
export default function Colorbox() {
  const dispatch = useDispatch();

  const colorChange = (color: string) => {
    dispatch(drawActions.colorChange(color));
  };
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const draws = useSelector((state: any) => state.drawReducer); //펜 관리

  const setColor = (color: string) => {
    const now = canvas.getActiveObject();
    if (now) {
      if (now.type == "textbox") {
        now.set("fill", color);
        console.log(now);
        canvas.renderAll();
      }
    } else canvas.freeDrawingBrush.color = color;
  };

  useEffect(() => {
    if (canvas) {
      console.log(draws.color);
      setColor(draws.color);
      canvas.renderAll();
    }
  }, [draws.color]);

  return (
    <ColorContainer>
      {COLORS.map((value: string, key: number) => (
        <Colorchip
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
