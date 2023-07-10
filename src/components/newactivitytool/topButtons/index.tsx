import React from "react";
import CanvasHistory from "./historyButton";

import { TopArea, TopButtonContainer } from "./style";
import ZoomButton from "./zoomButton";

export default function TopButtons() {
  return (
    <TopArea>
      <TopButtonContainer>
        <CanvasHistory />
        <ZoomButton />
      </TopButtonContainer>
    </TopArea>
  );
}
