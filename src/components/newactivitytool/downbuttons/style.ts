import styled from "styled-components";
import { Button } from "../styles/commonStyle";

export const ButtonsContainer = styled(Button)`
  background-color: white;
  display: flex;
  justify-content: left;
  align-items: center;
  overflow: hidden;
  height: 72px;
`;

export const ButtonInnerBox = styled.div`
  margin: 4px;
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 28px;
`;

export const ButtonInnerIcon = styled.div<{ state: number }>`
  width: ${(props) => (props.state == 1 ? "64px" : "32px")};
  height: ${(props) => (props.state == 1 ? "64px" : "32px")};
  background-color: #4ab859;
  border-radius: ${(props) => (props.state == 1 ? "28px" : "16px")};
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