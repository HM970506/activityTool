import { useDispatch } from "react-redux";
import styled from "styled-components";
import { drawActions } from "../../../store/common/drawSlice";

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
