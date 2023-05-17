import { usePinch } from "@use-gesture/react";
import CanvasHistory from "./historyButton";

import { TopArea, TopButtonContainer } from "./style";
import { useState } from "react";
import { ReducersType } from "../types";
import { useSelector } from "react-redux";

export default function TopButtons() {
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);

  return (
    <TopArea>
      <TopButtonContainer>
        <CanvasHistory />
        <div
          onClick={() => {
            canvas.setZoom({ x: 0, y: 0 }, 1);
          }}
        >
          zoom
        </div>
      </TopButtonContainer>
    </TopArea>
  );
}
