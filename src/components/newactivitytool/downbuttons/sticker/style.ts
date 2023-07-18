import styled from "styled-components";
import { OptionContainer } from "../style";

export const StickerOptionContainer = styled(OptionContainer)`
  width: 332px;
  height: 144px;
  padding-left: 16px;
  padding-bottom: 8px;
`;

export const StickerCategoryContainer = styled.div`
  gap: 4px;
  display: flex;
  justify-content: left;
  align-items: center;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const StickerCategory = styled.div<{ state: number }>`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px;
  border-radius: 16px;
  background-color: ${(props) => (props.state === 1 ? "#FFAB44" : "white")};
`;

export const StickerListConatiner = styled.div`
  display: flex;
  justify-content: left;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  align-items: center;
`;

export const StickerBox = styled.div`
  width: 96px;
  height: 96px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
