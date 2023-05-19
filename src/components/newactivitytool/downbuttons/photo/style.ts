import styled from "styled-components";
import { ButtonInnerBox, ButtonsContainer } from "../style";

export const PhotoContatiner = styled(ButtonsContainer)``;

export const Button = styled.div`
  width: 80px;
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Uploader = styled.input`
  display: none;
`;
