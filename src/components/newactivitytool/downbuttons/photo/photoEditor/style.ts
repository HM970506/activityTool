import styled from "styled-components";
import { Button, ButtonInner } from "../../../style";
import { OptionContainer } from "../../style";

export const PhotoEditorContainer = styled.div<{ view: number }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0);
  z-index: 1001;
`;

export const PhotoEditorOverlay = styled.div<{ view: number }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  display: ${(props) => (props.view == 1 ? "block" : "none")};
  background-color: rgba(0, 0, 0, 0.3);
`;

export const PhotoEditorButtons = styled.div`
  grid-column: 1/3;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  button {
    width: 30%;
    height: 60%;
  }
`;

export const PhotoEditorCutterContainer = styled.div``;

export const PhotoEditorCutter = styled.div`
  height: 10% impotant!;
`;
export const CheckButton = styled(Button)`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: #2ae859;
  fill: white;
  color: white;
`;

export const OptionButton = styled(Button)``;

export const PhotoOption1 = styled(OptionContainer)`
  width: 264px;
  height: 88px;
  border-radius: 32px;
  padding-left: 24px;
  display: flex;
  justify-content: left;
  align-items: center;
`;

export const PhotoOption2 = styled(OptionContainer)`
  width: 488px;
  height: 112px;
  border-radius: 32px;
  display: flex;
  justify-content: left;
  align-items: center;
  overflow-x: scoll;
`;

export const FilterComponent = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 24px;
  margin: 4px;
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: end;

  p {
    margin-bottom: 6px;
  }
`;

export const OptionComponent = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OptionComponentSelectBox = styled.div<{ select: number }>`
  width: 40px;
  height: 40px;
  border-radius: 16px;
  background-color: ${(props) => (props.select == 1 ? "#859AB4" : "white")};
  stroke: ${(props) => (props.select == 1 ? "white" : "#898885")};

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PhotoEditButtonInner = styled(ButtonInner)`
  color: #898885;
  flex-direction: column;
`;
