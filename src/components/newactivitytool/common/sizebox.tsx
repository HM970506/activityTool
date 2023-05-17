import style from "styled-components";

const SizeContainer = style.div`  display: flex;
justify-content: left;
align-items: center;
overflow-x: scroll; 
gap:4px;

::-webkit-scrollbar {
  display: none;
}`;
const Sizechip = style.div<{ select: number }>`
color: ${(props) => (props.select === 1 ? "white" : "black")};
`;
const SizechipBox = style.div<{ color: string; select: number }>`
width: 40px;
height: 40px;
border: none;
border-radius: 16px;
background-color: ${(props) => (props.select === 1 ? props.color : "white")};
display: flex;
margin:4px 4px 4px 0px;
justify-content: center;
align-items: center;`;

const SIZES = [1, 5, 10, 20, 50];

export default function SizeBox({
  setSize,
  option,
  keyName,
}: {
  setSize: Function;
  option: { color: string; size: number };
  keyName: string;
}) {
  const { color, size } = option;

  return (
    <SizeContainer className={"option"}>
      {SIZES.map((value: number, key: number) => (
        <SizechipBox
          className={"option"}
          select={size === value ? 1 : 0}
          key={`${keyName}size${key}`}
          color={color}
        >
          <Sizechip
            className={"option"}
            select={size === value ? 1 : 0}
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
