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
