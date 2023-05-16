import { usePinch } from "@use-gesture/react";
import CanvasHistory from "./historyButton";

import { TopArea, TopButtonContainer } from "./style";
import { useState } from "react";
import { ReducersType } from "../types";
import { useSelector } from "react-redux";

export default function TopButtons() {
  const [zoom, setZoom] = useState<any>(null);
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const bind = usePinch(({ da }) => {
    const [scaleValue] = da;
    setZoom(scaleValue);
    // canvas.zoomToPoint(point, zoom);
  });

  return (
    <TopArea>
      <TopButtonContainer>
        <CanvasHistory />
        <div>{zoom}</div>
      </TopButtonContainer>
    </TopArea>
  );
}
