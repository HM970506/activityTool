import styled from "styled-components";

export const DefaultButton = styled.button`
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;

export const Button = styled(DefaultButton)`
  border: none;
  width: 100%;
  height: 20%;
  background-color: white;
  border: 1px solid black;
  text-align: center;
`;

export const BottomButton = styled.button<{ select: number }>`
  width: 70px;
  height: 50px;
  background-color: ${(props) => {
    return props.select == 1 ? "red" : "white";
  }};
`;

export const MainButton = styled(DefaultButton)`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 20px;
  z-index: 1000;
  width: 10%;
  height: 8%;
  border: 1px solid black;
  background-color: white;
  transition-property: top-layer;
`;

export const SubButton = styled(Button)`
  position: absolute;
  margin: 20px;
  width: 80px;
  height: 80px;
  background-color: blue;
  color: white;
  z-index: 1001;
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

  right: ${(props) => `${props.view == 1 ? 0 : -200}px`};
`;

export const BottomContainer = styled(Box)<{ view: number }>`
  width: 90%;
  bottom: ${(props) => `${props.view == 1 ? 0 : -200}px`};
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
