import styled from "styled-components";

export const Background = styled.main<{ backgroundcolor: string }>`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.backgroundcolor};
`;

export const Template = styled.img`
  object-fit: cover;
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
export const Dialog = styled.dialog`
  ::backdrop {
    background-color: rgba(0, 0, 0, 1);
    width: 100%;
    height: 100%;
    display: flex;
    align-item: center;
    justify-content: center;
  }

  padding: 0;
  margin: 0;
`;
