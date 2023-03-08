import styled from "styled-components";

export const Template = styled.main<{ image: string }>`
  background-image: ${(props) => `url(./test${props.image}.PNG)`};
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-color: black;
  width: 100vw;
  height: 100vh;
`;
