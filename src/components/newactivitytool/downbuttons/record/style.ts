import styled from "styled-components";
import { ButtonsContainer } from "../style";

export const RecordContatiner = styled(ButtonsContainer)``;

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

export const Recorder = styled.audio``;
