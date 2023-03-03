import styled from "styled-components";

export const Button = styled.button`
  border-radius: 100%;
  border: none;
  width: 100px;
  height: 100px;
  background-color: red;
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

  width: 100vw;
  height: 100vh;

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
  margin: 20px;
  flex-direction: column;
`;

export const ToolBox = styled(Box)`
  width: 90%;
  height: 100px;
  background-color: blue;
`;

export const Canvas = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const SideButtonBox = styled.div`
  position: absolute;
  top: 0;
  right: 100px;
`;

export const SideButton = styled.button<{ size: number }>`
  width: 120px;
  font-size: ${(props) => props.size + "px"};

  margin: 5px;
`;

export const TextEditor = styled.textarea<{ size: number }>`
  border: 0;
  background-color: white;
  font-size: ${(props) => props.size + "px"};
  padding: 3px;
  margin: 0;
  resize: none;
  overflow: hidden;
  outline: none;
`;

export const Uploader = styled.input`
  display: none;
`;
