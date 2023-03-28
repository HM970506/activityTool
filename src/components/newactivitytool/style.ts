import styled from "styled-components";

export const DefaultButton = styled.button`
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;

export const Button = styled(DefaultButton)`
  border-radius: 100%;
  border: none;
  width: 100px;
  height: 100px;
  background-color: white;
  border: 1px solid black;
`;

export const BottomButton = styled(Button)`
  width: 70px;
  height: 50px;
  border-radius: 0;
`;

export const MainButton = styled(Button)`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 20px;
  z-index: 1001;
  transition-property: top-layer;
`;

export const SubButton = styled(Button)`
  position: absolute;
  margin: 20px;
  width: 80px;
  height: 80px;
  background-color: blue;
  color: white;
  z-index: 1000;
`;

export const NewButton = styled(SubButton)`
  right: 80px;
  bottom: 30px;
`;

export const LoadButton = styled(SubButton)`
  right: 30px;
  bottom: 80px;
`;

export const Background = styled.dialog`
  transition-property: top-layer;

  width: 100%;
  height: 100%;

  ::backdrop {
    display: none;
  }
  border: 0;
  background-color: rgba(0, 0, 0, 0);
`;

export const Box = styled.div`
  position: absolute;
  margin: 20px;
  right: 0;
  bottom: 0;
  z-index: 1000;
`;

export const ButtonBox = styled(Box)`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

export const ToolBox = styled(Box)`
  width: 80%;
  height: 100px;
  background-color: white;
  overflow: auto;
  padding-right: 100px;
  padding-left: 12px;
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 10px;
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0);
`;

export const SideButtonBox = styled.div`
  position: absolute;
  top: 0;
  right: 100px;
`;

export const SideButton = styled.button<{ size: number }>`
  width: 120px;
  font-size: ${(props) => props.size + "px"};
`;

export const TextEditor = styled.textarea<{ size: number; line: number }>`
  border: 0;
  background-color: white;
  font-size: ${(props) => props.size + "px"};
  height: ${(props) => props.line * 1.2 + "em"};
  padding: 5px;
  margin: 0;
  resize: none;
  overflow: hidden;
  outline: none;
`;

export const Uploader = styled.input`
  display: none;
`;

export const OffsetBarX = styled.input<{ length: number }>`
  width: ${(props) => props.length};
`;

export const OffsetBarY = styled.input<{ length: number }>`
  width: ${(props) => props.length};
  transform: rotate(270deg);
`;

export const Textarea = styled.textarea`
  position: absolute;
  display: none;
  top: 0;
  left: 0;
  resize: none;
  overflow: hidden;
  outline: none;
  word-break: keep-all;
  rows: 1;
  background-color: white;
`;

export const CanvasBackground = styled.div`
  position: relative;
  height: window.innerHeight;
  width: window.innerWidth;
`;
