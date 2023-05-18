import styled from "styled-components";
import { ButtonsContainer, OptionContainer } from "../style";
import { animated } from "react-spring";

export const ToolsContatiner = styled(ButtonsContainer)``;

export const ToolNowBox = styled.div`
  margin: 4px;
  display: flex;
  justify-content: center;

  align-items: center;
`;

export const ToolNow = styled(animated.div)`
  background-color: #4ab859;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DrawOptionContainer = styled(OptionContainer)`
  width: 264px;
  height: 128px;
  padding-top: 20px;
  padding-left: 24px;
`;

export const BottomButton = styled.button<{ select: number; color: string }>`
  width: 70px;
  height: 50px;
  background-color: ${(props) => {
    return props.select === 1 ? props.color : "white";
  }};
  color: ${(props) => {
    return props.select === 1 ? "white" : "black";
  }};
  display: flex;
  justify-content: center;
  align-items: center;
`;
