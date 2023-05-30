import { useDispatch, useSelector } from "react-redux";
import { ReducersType } from "../types";
import { zoomActions } from "../../../store/common/zoomSlice";
import { SvgBox, ZoomContainer } from "./style";
import { ReactComponent as Rotato } from "./svg/rotato.svg";

export default function ZoomButton() {
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const zoom = useSelector((state: ReducersType) => state.zoomReducer.zoom);
  const dispath = useDispatch();

  return (
    <ZoomContainer>
      <span> {Math.round(zoom * 100)}%</span>
      <span
        onClick={() => {
          if (zoom !== 1) {
            canvas.zoomToPoint(
              { x: window.innerWidth / 2, y: window.innerHeight / 2 },
              1
            );
            dispath(zoomActions.setZoom(1));
          }
          canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        }}
      >
        <SvgBox>
          <Rotato />
        </SvgBox>
      </span>
    </ZoomContainer>
  );
}
