import { usePinch } from "@use-gesture/react";
import CanvasHistory from "./historyButton";

import { TopArea, TopButtonContainer } from "./style";
import { useState } from "react";
import { ReducersType } from "../types";
import { useSelector } from "react-redux";

export default function TopButtons() {
  return (
    <TopArea>
      <TopButtonContainer>
        <CanvasHistory />
        <div>zoom</div>
      </TopButtonContainer>
    </TopArea>
  );
}
