import BottomTools from "../bottomTools";
import CanvasHistory from "./historyButton/history";
import CanvasOpacity from "./opacityButton/opacity";
import CanvasSave from "./saveButton";
import ToggleButton from "./toggleButton/toggleButton";
import ZoomButton from "./zoomButton/zoomButton";

export default function TopButtons() {
  return (
    <>
      <ToggleButton />
      <BottomTools />
      <CanvasHistory />
      <CanvasSave />
      <ZoomButton />
      <CanvasOpacity />
    </>
  );
}
