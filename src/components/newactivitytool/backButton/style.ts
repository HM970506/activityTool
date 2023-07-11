import styled from "styled-components";
import { Button } from "../styles/style";

export const BackButton = styled(Button)`
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: #292825;
  fill: white;
  stroke: white;
  color: white;

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const Loading = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 100px;
  left: 0;
  top: 0;
  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;
`;
