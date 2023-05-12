import CanvasHistory from "./historyButton";

import { TopArea, TopButtonContainer } from "./style";

export default function TopButtons() {
  return (
    <TopArea>
      <TopButtonContainer>
        <CanvasHistory />
        <div>100 % d</div>
      </TopButtonContainer>
    </TopArea>
  );
}
