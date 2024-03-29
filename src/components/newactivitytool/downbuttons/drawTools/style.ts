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

  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const DrawOptionContainer = styled(OptionContainer)`
  width: 264px;
  padding: 20px 0px 30px 24px;
  position: block;
`;

export const BottomButton = styled.div`
  margin: 20px 2px 0px 2px;
  border: none;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ToolBox = styled.div<{ select: number }>`
  width: 56px;
  height: 72px;
  bottom: ${(props) => (props.select === 1 ? "0px" : "-20px")};
  position: relative;
`;

export const Tool = styled.img`
  width: inherit;
  height: inherit;
  position: absolute;
  z-index: 2;

  top: 0;
  left: 0;
`;

export const ToolBackground = styled.div<{ color: string }>`
  background-color: ${(props) => (props.color !== "" ? props.color : "white")};
  width: 50px;
  height: 70px;
  position: absolute;
  z-index: 1;

  top: 5px;
  left: 5px;
`;

export const Thumbnail = styled.img`
  witdh: 32px;
  height: 32px;
`;

export const ThumbnailBox = styled.div<{ color: string }>`
  witdh: 32px;
  height: 32px;
  background-color: ${(props) => (props.color !== "" ? props.color : "white")};
`;
