import styled from "styled-components";

export const PhotoEditorContainer = styled.div<{ view: number }>`
  width: 70%;
  height: 70%;
  position: absolute;
  top: 15%;
  left: 15%;
  background-color: white;
  z-index: 1001;
  display: ${(props) => (props.view == 1 ? "grid" : "none")};
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 5fr 1fr;
  justify-content: center;
  align-items: center;

  div {
    border: 1px solid black;
  }
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
