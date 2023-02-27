import styled from "styled-components";

export const Button = styled.button`
  border-radius: 100%;
  border: none;
  width: 100px;
  height: 100px;
  background-color: red;
`;

export const MainButton = styled(Button)`
  z-index: 10003;
`;

export const SubButton = styled(Button)`
  position: absolute;
  margin: 20px;
  width: 80px;
  height: 80px;
  background-color: blue;
  color: white;
`;

export const NewButton = styled(SubButton)`
  right: 80px;
  bottom: 30px;
`;

export const LoadButton = styled(SubButton)`
  right: 30px;
  bottom: 80px;
`;

export const Box = styled.div`
  z-index: 10002;
  position: absolute;

  right: 0;
  bottom: 0;
  margin: 20px;
`;

export const ButtonBox = styled(Box)`
  background-color: black;
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

export const ToolBox = styled(Box)`
  width: 90%;
  height: 100px;
  background-color: blue;
  z-index: 10001;
`;

export const Canvas = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.2);
`;
