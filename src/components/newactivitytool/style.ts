import styled from "styled-components";
import { animated } from "react-spring";

export const DefaultButton = styled(animated.div)`
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;

export const Button = styled(DefaultButton)`
  text-align: center;
  p {
    margin-bottom: 6px;
  }

  border: none;
  width: 72px;
  height: 72px;
  border-radius: 32px;
  background-color: white;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonInner = styled(animated.div)`
  margin: 4px;
  width: 64px;
  height: 64px;
  border-radius: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DownButtonsContainer = styled(animated.div)`
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  bottom: 8px;
  gap: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled.img`
  width: 32px;
  height: 32px;
`;

export const CategoryButton = styled(Button)`
  width: 80px;
  height: 72px;
`;

export const CategoryButtonText = styled.p`
  margin-bottom: 6px;
`;

//인덱스에서 쓰이는 css

export const MainButton = styled(Button)`
  position: absolute;
  bottom: 8px;
  right: 8px;
  z-index: 1000;
  border: 1px solid black;
  background-color: white;
  transition-property: top-layer;
`;

export const SubButtonContainer = styled(MainButton)`
  display: block;
  width: 128px;
  height: 112px;
  padding-top: 16px;
  padding-bottom: 16px;
  border-radius: 32px;
  bottom: 88px;
  right: 8px;
`;

export const SubButton = styled.div`
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Background = styled.div<{ z: number; view: number }>`
  transition-property: top-layer;
  display: ${(props) => (props.view === 1 ? "absolute" : "none")};
  top: 0;
  left: 0;
  z-index: ${(props) => props.z};
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

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const ModalOverlay = styled(Overlay)`
  background-color: rgba(0, 0, 0, 0);
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

export const Uploader = styled.input`
  display: none;
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

export const TempLink = styled.a`
  display: none;
`;
