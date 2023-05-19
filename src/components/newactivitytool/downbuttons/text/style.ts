import styled from "styled-components";
import { ButtonInnerBox, OptionContainer } from "../style";

export const TextOptionContainer = styled(OptionContainer)`
  width: 488px;
  height: 112px;
  display: flex;
  justify-content: left;
  align-items: center;
  border-radius: 32px;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const FontButton = styled.button<{ font: string; url: string }>`
  width: 96px;
  height: 96px;
  border-radius: 24px;
  margin: 8px;
  overflow: hidden;

  @font-face {
    font-family: ${(props) => {
      return props.font;
    }};
    src: url(${(props) => {
      return props.url;
    }});
  }

  font-family: ${(props) => {
    return props.font;
  }};
  border: none;
  font-size: 20px;
`;

export const TextCategory = styled.div<{ state: number }>`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px;
  border-radius: 16px;
  background-color: ${(props) => (props.state == 1 ? "#FFAB44" : "white")};
`;

export const TextListConatiner = styled.div`
  display: flex;
  justify-content: left;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  align-items: center;
`;

export const TextBox = styled.div`
  width: 96px;
  height: 96px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
