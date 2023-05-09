import { useEffect, useState } from "react";
import { COLORS } from "../types";
import style from "styled-components";

const ColorContainer = style.div`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 8px;
  overflow-x: scroll; 

  ::-webkit-scrollbar {
    display: none;
  }
`;

const ColorchipBox = style.button<{ color: string; select: number }>`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 16px;
  background-color: ${(props) => (props.select === 1 ? props.color : "white")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Colorchip = style.div<{ color: string; select: number }>`
  width: 22px;
  height: 22px;
  border: ${(props) => (props.select === 1 ? "2px solid white" : "none")};
  bottom: ${(props) => (props.select === 1 ? "15px" : "0px")};
  border-radius: 100%;
  background-color: ${(props) => {
    return props.color;
  }};
`;

export default function Colorbox({ colorChange }: { colorChange: Function }) {
  const [color, setColor] = useState<string>("black");

  useEffect(() => {}, [color]);

  return (
    <ColorContainer>
      {COLORS.map((value: string, key: number) => (
        <ColorchipBox select={color === value ? 1 : 0} color={value}>
          <Colorchip
            select={color === value ? 1 : 0}
            color={value}
            onClick={() => {
              setColor(value);
            }}
          />
        </ColorchipBox>
      ))}
    </ColorContainer>
  );
}
