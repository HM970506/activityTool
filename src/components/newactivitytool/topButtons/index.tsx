import BottomTools from "../bottomTools";
import CanvasHistory from "./historyButton";
import CanvasOpacity from "./opacityBar";
import CanvasSave from "./saveButton";
import DrawToggle from "./drawingButton";
import ZoomButton from "./zoomButton";
import PanningToggle from "./panningButton";
import ViewButton from "./viewButton";
import { TopButtonContainer } from "../styles/zoomButtonStyle";
import { useDispatch, useSelector } from "react-redux";
import { ReducersType } from "../types";
import { nodeActions } from "../../../store/common/nodeSlice";

export default function TopButtons() {
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const isPanning = useSelector(
    (state: ReducersType) => state.nodeReducer.isPanning
  );
  const dispatch = useDispatch();
  const panFunction = (set: boolean) => {
    dispatch(nodeActions.setPan(set));
  };

  const drawFunction = (set: boolean) => {
    dispatch(nodeActions.setDraw(set));
  };

  return (
    <TopButtonContainer>
      <DrawToggle />
      <BottomTools />
      <CanvasHistory />
      <CanvasSave />
      <ZoomButton />
      <CanvasOpacity />
      <PanningToggle
        canvas={canvas}
        isPanning={isPanning}
        setPan={panFunction}
        setDraw={drawFunction}
      />
      <ViewButton />
    </TopButtonContainer>
  );
}
