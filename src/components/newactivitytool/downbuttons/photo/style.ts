import styled from "styled-components";
import { ButtonInnerBox, ButtonsContainer, OptionContainer } from "../style";

export const PhotoContatiner = styled(ButtonsContainer)<{ state: number }>`
  width: ${(props) => (props.state == 1 ? "268px" : "72px")};
  display: flex;
  justify-content left;
  align-items: center;
`;

export const PhotoInnerBox = styled(ButtonInnerBox)<{ state: number }>`
  margin: 4px;
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.state == 1 ? "#22E895" : "white")};
`;

export const Button = styled.div`
  width: 80px;
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Uploader = styled.input`
  display: none;
`;
