import { useEffect, useState } from "react";
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

const Colorchip = styled.button<{ color: string; select: number }>`
  width: 30px;
  height: 30px;
  border: none;
  bottom: ${(props) => (props.select == 1 ? "15px" : "0px")};
  border-radius: 100%;
  position: relative;
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
  const [colorCategory, setColorCategory] = useState<string>("black");

  return (
    <ColorContainer>
      {COLORS.map((value: string, key: number) => (
        <Colorchip
          select={colorCategory == value ? 1 : 0}
          color={value}
          key={key}
          onClick={() => {
            colorChange(value);
            setColorCategory(value);
          }}
        />
      ))}
    </ColorContainer>
  );
}
