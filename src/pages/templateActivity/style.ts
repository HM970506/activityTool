import styled from "styled-components";

export const Template = styled.main<{ url: string; backgroundcolor: string }>`
  background-image: ${(props) => `url(${props.url})`};
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-color: ${(props) => props.backgroundcolor};
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: fixed;
`;

export const ColorBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100px;
  position: fixed;
  top: 10px;
  left: 10px;
  overflow: auto;
  display: flex;
  align-item: center;
`;

export const ColorChip = styled.div<{ backgroundcolor: string }>`
  width: 30px;
  height: 30px;
  margin: 10px;
  border-radius: 100%;
  background-color: ${(props) => props.backgroundcolor};
`;
