import style from "styled-components";

export const SizeContainer = style.div`  display: flex;
justify-content: left;
align-items: center;
overflow-x: scroll; 
gap:4px;


::-webkit-scrollbar {
  display: none;
}`;
export const Sizechip = style.div<{ color: string }>`
stroke: ${(props) => (props.color === "" ? "white" : props.color)};
fill: ${(props) => (props.color === "" ? "white" : props.color)};
`;
export const SizechipBox = style.div<{ color: string; select: number }>`
width: 40px;
height: 40px;
border: none;
border-radius: 16px;
background-color: ${(props) => (props.select === 1 ? props.color : "white")};
display: flex;
margin:4px 4px 4px 0px;
justify-content: center;
align-items: center;`;

export const SIZES = [1, 5, 10, 20, 50];
