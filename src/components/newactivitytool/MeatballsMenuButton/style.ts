import styled from "styled-components";
import { Button } from "../styles/style";

export const MeatballsMenuButton = styled(Button)`
  position: absolute;
  right: 8px;
  bottom: 8px;
`;

export const Menus = styled.div`
  width: 272px;
  padding-top: 16px;
  padding-bottom: 16px;
  border-radius: 32px;
  background-color: white;
  position: absolute;
  right: 8px;
  bottom: 88px;
  fill: #494845;
  stroke: "#494845";
`;

export const Menu = styled.div`
  padding: 15px 24px 15px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
