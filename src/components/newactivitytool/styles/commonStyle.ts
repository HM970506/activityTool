import styled from "styled-components";

export const DefaultButton = styled.div`
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;

export const Button = styled(DefaultButton)`
  border: none;
  width: 72px;
  height: 72px;
  border-radius: 32px;
  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BackButton = styled(Button)`
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: #292825;
  fill: white;
  color: white;
`;

export const DownButtonsContainer = styled.div`
  position: absolute;
  bottom: 8px;
  width: 100%;
  gap: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BottomButton = styled.button<{ select: number; color: string }>`
  width: 70px;
  height: 50px;
  background-color: ${(props) => {
    return props.select === 1 ? props.color : "white";
  }};
  color: ${(props) => {
    return props.select === 1 ? "white" : "black";
  }};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainButton = styled(Button)`
  position: absolute;
  bottom: 8px;
  right: 8px;
  z-index: 1000;
  border: 1px solid black;
  background-color: white;
  transition-property: top-layer;
`;

export const Background = styled.dialog`
  transition-property: top-layer;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;

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

export const ButtonBox = styled(Box)<{ view: number }>`
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: space-between;
  width: 10%;
  height: 60%;

  right: ${(props) => `${props.view === 1 ? 0 : -200}px`};
`;

export const BottomContainer = styled(Box)<{ view: number }>`
  width: 90%;
  bottom: ${(props) => `${props.view === 1 ? 0 : -200}px`};
`;

export const ToolBox = styled.div`
  height: 100px;
  background-color: white;
  overflow: auto;
  padding-right: 100px;
  padding-left: 12px;
  gap: 10px;
  display: flex;
  justify-content: left;
  align-items: center;
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

export const SideButton = styled.button<{ font: string }>`
  width: 120px;
  font-family: ${(props) => props.font};
  font-size: 30px;
  border: none;
  background-color: inherit;
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

export const CanvasBackground = styled.div`
  position: relative;
  height: window.innerHeight;
  width: window.innerWidth;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SelectButton = styled.button<{ color: string; select: number }>`
  border: none;
  border-radius: 16px;
  background-color: ${(props) => (props.select === 1 ? props.color : "white")};
  fill: ${(props) => (props.select === 1 ? "white" : props.color)};
  color: ${(props) => (props.select === 1 ? "white" : props.color)};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
`;
