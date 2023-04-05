import BottomTools from "../bottomTools";
import CanvasHistory from "./historyButton/history";
import CanvasOpacity from "./opacityButton/opacityBar";
import CanvasSave from "./saveButton";
import DrawToggle from "./drawingButton/drawingButton";
import ZoomButton from "./zoomButton/zoomButton";
import PanningToggle from "./panningButton/panningButton";
import ViewButton from "./viewButton/viewButton";
import { TopButtonContainer } from "./style";
import { useSelector } from "react-redux";

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
