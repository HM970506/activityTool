import styled from "styled-components";
import { ButtonInnerBox, ButtonsContainer } from "../style";

export const PhotoContatiner = styled(ButtonsContainer)``;

export const PhotoInnerBox = styled(ButtonInnerBox)`
  margin: 4px;
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
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

export const Icon = styled.img`
  width: 50px;
  height: 50px;
`;
