import styled from "styled-components";
import { ButtonsContainer, OptionContainer } from "../style";

export const ToolsContatiner = styled(ButtonsContainer)<{ state: number }>`
  width: ${(props) => (props.state == 1 ? "420px" : "72px")};
`;

export const ToolNowBox = styled.div<{ state: number }>`
  margin: 4px;
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;

  align-items: center;
`;

export const ToolNow = styled.div<{ state: number }>`
  width: ${(props) => (props.state == 1 ? "64px" : "32px")};
  height: ${(props) => (props.state == 1 ? "64px" : "32px")};
  background-color: #4ab859;
  overflow: hidden;
  border-radius: ${(props) => (props.state == 1 ? "28px" : "16px")};
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
