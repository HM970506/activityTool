import styled from "styled-components";
import { ButtonsContainer, OptionContainer } from "../style";
import { animated } from "react-spring";

export const ToolsContatiner = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;

  gap: 8px;
`;

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
  overflow-y: visible;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const BottomButton = styled.div`
  margin: 20px 2px 0px 2px;
  width: 56px;
  border: none;
  justify-content: center;
  align-items: center;
  background-color: none;
`;

export const ToolBox = styled.div<{ select: number }>`
  height: 72px;
  bottom: ${(props) => (props.select === 1 ? "0px" : "-15px")};
  position: relative;
`;

export const Tool = styled.img`
  width: inherit;
  height: inherit;
  position: absolute;
  z-index: 2;

  width: 56px;
  height: 64px;
`;

export const ToolBackground = styled.div<{ color: string }>`
  fill: ${(props) => (props.color !== "" ? props.color : "white")};
  width: 50px;
  height: 70px;
  position: absolute;
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

export const ToolButtonContainer = styled.div`
  background-color: white;
  border-radius: 25px;
  display: flex;
  justify-content: left;
  align-items: center;
  overflow: hidden;
  height: 72px;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  width: 31.2vw;
  height: 64px;
  display: flex;
  justify-content: center;

  gap: 16px;
`;

export const ButtonInner = styled.div`
  width: 64px;
  height: 64px;
  background-color: #4ab859;
  border-radius: 30px;

  display: flex;
  justify-content: center;

  align-items: center;
  stroke: white;
`;

// 컬러 관련

export const DrawOptionContainer = styled.div`
  background-color: white;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);

  overflow: hidden;
  width: 55vw;
  height: 64px;
  padding-left: 24px;

  display: flex;
`;

export const ColorContainer = styled.div`
  justify-content: left;
  align-items: flex-start;
  gap: 6px;
  display: inline-flex;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ColorchipButton = styled.button`
  border: none;
  background: none;
  overflow: visible;

  min-width: 54px;
  height: 64px;

  display: flex;
  justify-content: center;

  position: relative;
  top: 25px;
`;

export const Colorchip = styled(ToolBackground)<{
  color: string;
  select: number;
}>`
  fill: ${(props) => (props.color !== "" ? props.color : "white")};

  bottom: ${(props) => (props.select === 1 ? "15px" : "0px")};
  background-color: none !important;
`;
