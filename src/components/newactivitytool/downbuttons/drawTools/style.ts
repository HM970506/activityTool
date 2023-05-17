import styled from "styled-components";
import { ButtonsContainer, OptionContainer } from "../style";
import { motion } from "framer-motion";

export const ToolsContatiner = styled(ButtonsContainer)<{ state: number }>`
  width: ${(props) => (props.state == 1 ? "420px" : "72px")};
`;

export const ToolNowBox = styled.div`
  margin: 4px;
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;

  align-items: center;
`;

export const ToolNow = styled(motion.div)<{ state: number }>`
  initial {
  }
  width: 64px;
  height: 64px;
  background-color: #4ab859;
  overflow: hidden;
  border-radius: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DrawOptionContainer = styled(OptionContainer)`
  width: 264px;
  height: 128px;
  padding-top: 20px;
  padding-left: 24px;
`;
