import styled from "styled-components";
import { animated } from "react-spring";

export const ButtonsContainer = styled(animated.div)`
  background-color: white;
  border-radius: 32px;
  display: flex;
  justify-content: left;
  align-items: center;
  overflow: hidden;
  height: 72px;
`;

export const ButtonInnerIcon = styled.div<{ state: number }>`
  width: ${(props) => (props.state === 1 ? "64px" : "32px")};
  height: ${(props) => (props.state === 1 ? "64px" : "32px")};
  background-color: #4ab859;
  border-radius: ${(props) => (props.state === 1 ? "28px" : "16px")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OptionContainer = styled.div`
  background-color: white;
  border-radius: 32px;
  position: absolute;
  bottom: 100px;
  overflow: hidden;
`;
