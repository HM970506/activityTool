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
  padding: 20px 0px 30px 24px;
  position: block;
`;

export const BottomButton = styled.button<{ color: string }>`
  background-color: ${(props) => (props.color !== "" ? props.color : "white")};

  margin: 20px 2px 0px 2px;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ToolBox = styled.div<{ select: number }>`
  position: relative;
  z-index: 1;
  width: 56px;
  height: 72px;
  bottom: ${(props) => (props.select === 1 ? "0px" : "-20px")};
`;

export const Tool = styled.img`
  width: inherit;
  height: inherit;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
`;

export const ToolColor = styled.div<{ color: string }>``;
