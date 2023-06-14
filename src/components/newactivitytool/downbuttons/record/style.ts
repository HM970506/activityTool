import styled from "styled-components";
import { ButtonsContainer } from "../style";
import { CategoryButton, Icon } from "../../styles/style";

export const RecordContatiner = styled(ButtonsContainer)``;

export const Button = styled.div`
  width: 80px;
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RecorderButton = styled(CategoryButton)`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: none;

  img {
    width: 16px;
    height: 16px;
  }
`;

export const RecorderTime = styled.span`
  margin-left: 24px;
  margin-right: 43px;
`;

export const Recorder = styled.audio``;

export const Icon2 = styled(Icon)`
  width: 64px;
  height: 64px;
  position: relative;
  bottom: 5px;
`;
