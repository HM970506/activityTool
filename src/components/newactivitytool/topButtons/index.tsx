import BottomTools from "../bottomTools";
import CanvasHistory from "./historyButton";
import CanvasOpacity from "./opacityBar";
import CanvasSave from "./saveButton";
import DrawToggle from "./drawingButton";
import ZoomButton from "./zoomButton";
import PanningToggle from "./panningButton";
import ViewButton from "./viewButton";
import { TopButtonContainer } from "../styles/zoomButtonStyle";

export default function TopButtons() {
  return (
    <TopButtonContainer>
      <DrawToggle />
      <BottomTools />
      <CanvasHistory />
      <CanvasSave />
      <ZoomButton />
      <CanvasOpacity />
      <PanningToggle />
      <ViewButton />
    </TopButtonContainer>
  );
}
