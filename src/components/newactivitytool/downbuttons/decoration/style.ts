import styled from "styled-components";
import { ButtonInnerBox, ButtonsContainer, OptionContainer } from "../style";
import { SelectButton } from "../../style";

export const DecoContatiner = styled(ButtonsContainer)``;

export const DecoInnerBox = styled(ButtonInnerBox)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Thumbnail = styled.img`
  width: 132px;
  height: 96px;
  border-radius: 24px;
  overflow: hidden;
`;

export const ThumbnailBox = styled.div`
  margin: 8px;
  text-align: center;

  p {
    margin-top: 10px;
  }
`;

export const DecoCategoryButton = styled.div<{ state: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  background-color: ${(props) => (props.state == 1 ? "red" : "white")};
`;

export const StampCategoryButton = styled(DecoCategoryButton)<{
  color: string;
}>`
  fill: ${(props) => {
    return props.color;
  }};
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
  margin-bottom: 10px;
`;

export const DecoOptionContainer2 = styled(OptionContainer)`
  width: 262px;
  height: 98px;
  padding-top: 28px;
  padding-left: 32px;
  padding-bottom: 24px;
`;

export const Button = styled(SelectButton)`
  width: 40px;
  height: 40px;
`;

export const Icon = styled.img`
  width: 50px;
  height: 50px;
`;
