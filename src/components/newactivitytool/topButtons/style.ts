import styled from "styled-components";
import { DefaultButton } from "../style";

export const TopButtonContainer = styled.div`
  width: 268px;
  height: 56px;
  border-radius: 24px;
  background-color: #292825;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TopArea = styled.div`
  width: 100%;
  position: absolute;
  top: 12px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TopButton = styled(DefaultButton)`
  background-color: inherit;
  border: none;
  stroke: white;
  fill: white;
  color: white;
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HistoryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 16px;
`;

export const ZoomContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 116px;
  margin-right: 16px;
`;
