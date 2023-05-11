import CanvasHistory from "./historyButton";
import CanvasOpacity from "./opacityBar";
import DrawToggle from "./drawingButton";
import ZoomButton from "./zoomButton";
import PanningToggle from "./panningButton";
import ViewButton from "./viewButton";
import { useDispatch, useSelector } from "react-redux";
import { ReducersType } from "../types";
import { nodeActions } from "../../../store/common/nodeSlice";
import { zoomActions } from "../../../store/common/zoomSlice";
import { TopArea, TopButtonContainer } from "./style";

export default function TopButtons() {
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const isPanning = useSelector(
    (state: ReducersType) => state.nodeReducer.isPanning
  );
  const { zoom, zoomView } = useSelector(
    (state: ReducersType) => state.zoomReducer
  );
  const dispatch = useDispatch();
  const panFunction = (set: boolean) => {
    dispatch(nodeActions.setPan(set));
  };

  const drawFunction = (set: boolean) => {
    dispatch(nodeActions.setDraw(set));
  };

  const zoomFunction = (set: number) => {
    dispatch(zoomActions.setZoom(set));
  };

  const viewFucntion = (set: number) => {
    dispatch(zoomActions.setView(set));
  };

  const resetFunction = () => {
    dispatch(zoomActions.reset());
  };

  return (
    <TopArea>
      <TopButtonContainer>
        <CanvasHistory />
        <div>100 % d</div>
      </TopButtonContainer>
    </TopArea>
  );
}
