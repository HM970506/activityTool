import styled from "styled-components";
import { animated } from "react-spring";

export const ButtonsContainer = styled(animated.div)`
  background-color: white;
  border-radius: 25px;
  display: flex;
  justify-content: left;
  align-items: center;
  overflow: hidden;
  height: 72px;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
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
  overflow: hidden;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
`;
