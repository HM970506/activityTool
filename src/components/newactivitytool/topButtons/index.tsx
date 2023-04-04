import BottomTools from "../bottomTools";
import CanvasHistory from "./historyButton/history";
import CanvasOpacity from "./opacityButton/opacity";
import CanvasSave from "./saveButton";
import DrawToggle from "./drawingButton/drawingButton";
import ZoomButton from "./zoomButton/zoomButton";
import PanninToggle from "./panningButton/panningButton";

export default function TopButtons() {
  return (
    <>
      <DrawToggle />
      <BottomTools />
      <CanvasHistory />
      <CanvasSave />
      <ZoomButton />
      <CanvasOpacity />
      <PanninToggle />
    </>
  );
}
