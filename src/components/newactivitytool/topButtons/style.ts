import styled from "styled-components";
import { DefaultButton } from "../styles/style";

export const TopButtonContainer = styled.div`
  width: 268px;
  height: 56px;
  border-radius: 24px;
  background-color: #292825;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const TopArea = styled.div`
  width: 1px;
  position: absolute;
  top: 12px;
  left: 50%;
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

export const HistoryButton = styled(TopButton)<{ state: number }>`
  stroke: ${(props) => {
    return props.state ? "#f9f8f5" : "black";
  }};
  fill: ${(props) => {
    return props.state ? "#f9f8f5" : "black";
  }};
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

export const SvgBox = styled.span`
  stroke: #f9f8f5;
  margin-left: 9px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
