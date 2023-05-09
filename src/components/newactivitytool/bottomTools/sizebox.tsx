import { useState } from "react";
import style from "styled-components";

const SizeContainer = style.div`  display: flex;
justify-content: left;
align-items: center;
overflow-x: scroll; 
gap:4px;

::-webkit-scrollbar {
  display: none;
}`;
const Sizechip = style.div``;
const SizechipBox = style.button<{ color: string; select: number }>`
width: 40px;
height: 40px;
border: none;
border-radius: 16px;
background-color: ${(props) => (props.select === 1 ? props.color : "white")};
display: flex;
margin:4px 4px 4px 0px;
justify-content: center;
align-items: center;`;

const SIZES = [1, 2, 3, 4, 5];

export default function SizeBox({
  sizeChange,
  keyName,
}: {
  sizeChange: Function;
  keyName: string;
}) {
  const [size, setSize] = useState<number>(1);
  const color = "black";
  return (
    <SizeContainer>
      {SIZES.map((value: number, key: number) => (
        <SizechipBox
          select={size === value ? 1 : 0}
          key={`${keyName}size${key}`}
          color={color}
        >
          <Sizechip
            color={color}
            onClick={() => {
              setSize(value);
            }}
          >
            {value}
          </Sizechip>
        </SizechipBox>
      ))}
    </SizeContainer>
  );
}
