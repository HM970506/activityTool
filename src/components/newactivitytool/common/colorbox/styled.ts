import style from "styled-components";

export const ColorContainer = style.div`
  display: flex;
  justify-content: left;
  align-items: center;

  gap:6px;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
}

`;

export const Colorchip = style.div<{ color: string; select: number }>`
  width: 22px;
  height: 22px;
  border: ${(props) => (props.select === 1 ? "2px solid white" : "none")};
  bottom: ${(props) => (props.select === 1 ? "15px" : "0px")};
  border-radius: 100%;
  background-color: ${(props) => {
    return props.color;
  }};
`;
