import styled from "styled-components";
import { Button } from "../../styles/commonStyle";

export const ToolsContatiner = styled(Button)<{ state: number }>`
  width: ${(props) => (props.state == 1 ? "420px" : "72px")};
  height: 72px;
  background-color: white;
  display: flex;
  justify-content: left;
  align-items: center;
  overflow: hidden;
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
  border-radius: ${(props) => (props.state == 1 ? "28px" : "16px")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OptionContainer = styled.div`
  width: 264px;
  height: 128px;
  padding-top: 24px;
  padding-left: 37px;

  background-color: white;
  border-radius: 32px;
  position: absolute;
  bottom: 100px;
  overflow: hidden;
`;
