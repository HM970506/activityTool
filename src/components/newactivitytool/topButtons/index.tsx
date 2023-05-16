import { usePinch } from "@use-gesture/react";
import CanvasHistory from "./historyButton";

import { TopArea, TopButtonContainer } from "./style";
import { useState } from "react";

export default function TopButtons() {
  const [zoom, setZoom] = useState<any>(null);
  const bind = usePinch((state) => setZoom(state));

  return (
    <TopArea>
      <TopButtonContainer>
        <CanvasHistory />
        <div>{zoom}</div>
      </TopButtonContainer>
    </TopArea>
  );
}
