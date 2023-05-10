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

const ColorchipBox = style.div<{ color: string; select: number }>`
width: 40px;
height: 40px;
border: none;
border-radius: 16px;
background-color: ${(props) => (props.select === 1 ? props.color : "white")};
display: flex;
margin:4px 4px 4px 0px;
justify-content: center;
align-items: center;`;

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
        <ColorchipBox
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
        </ColorchipBox>
      ))}
    </ColorContainer>
  );
}
