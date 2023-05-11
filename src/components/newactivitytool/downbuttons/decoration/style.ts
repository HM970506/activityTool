import styled from "styled-components";
import { ButtonInnerBox, ButtonsContainer, OptionContainer } from "../style";

export const DecoContatiner = styled(ButtonsContainer)<{ state: number }>`
  width: ${(props) => (props.state == 1 ? "348px" : "72px")};
`;

export const DecoInnerBox = styled(ButtonInnerBox)<{ state: number }>`
  background-color: ${(props) => (props.state == 1 ? "#EE5859" : "white")};
`;
export const Thumbnail = styled.img`
  width: 132px;
  height: 96px;
  border-radius: 24px;
  overflow: hidden;
`;

export const ThumbnailBox = styled.div`
  margin: 8px;
`;

export const DecoCategoryButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DecoOptionContainer = styled(OptionContainer)`
  width: 340px;
  height: 148px;
  display: flex;
  justify-content: left;
  align-items: center;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const StampsContainer = styled.div`
  width: 340px;
  display: flex;
  justify-content: left;
  align-items: center;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
