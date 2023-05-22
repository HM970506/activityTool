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
  position: block;
`;

export const BottomButton = styled.button<{ select: number; color: string }>`
  width: 56px;
  height: 72px;
  position: relative;
  z-index: 1;
  bottom: ${(props) => (props.select === 1 ? "0px" : "-20px")};
  background-color: ${(props) => (props.color !== "" ? props.color : "white")};

  margin: 2px 0px;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;
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
