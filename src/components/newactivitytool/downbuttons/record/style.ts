import styled from "styled-components";
import { ButtonInnerBox, ButtonsContainer, OptionContainer } from "../style";

export const RecordContatiner = styled(ButtonsContainer)<{ state: number }>`
  width: ${(props) => (props.state == 1 ? "268px" : "72px")};
`;

export const RecordInnerBox = styled(ButtonInnerBox)<{ state: number }>`
  margin: 4px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.state == 1 ? "#2895AB" : "white")};
  width: 64px;
  height: 64px;
`;

export const Button = styled.div`
  width: 80px;
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RecorderButton = styled.button`
  width: 48px;
  heihgt: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: none;
`;

export const RecorderTime = styled.span`
  margin-left: 24px;
  margin-right: 51px;
`;

export const Recorder = styled.audio`
  display: none;
`;
