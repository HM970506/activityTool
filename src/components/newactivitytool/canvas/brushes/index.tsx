import { drawActions } from "../../../../store/common/drawSlice";
import {
  BACKGROUND_BRUSH,
  CRAYON,
  ERASER,
  FELTPEN,
  HIGHLIGHTER,
  INK,
  SPRAY,
  canvasType,
} from "../../types";
import CrayonMaker from "./crayon_brush";
import InkMaker from "./ink_brush";
import HighlighterMaker from "./marker_brush";
import { fabric } from "fabric-with-erasing";

export default function brushSetting(canvas: canvasType, dispatch: any) {
  CrayonMaker();
  HighlighterMaker();
  InkMaker();

  //브러쉬 초기세팅 관련 코드 시작
  dispatch(
    drawActions.setting({
      name: FELTPEN,
      brush: new fabric.PencilBrush(canvas, { color: "black", width: 1 }),
    })
  );
  dispatch(
    drawActions.setting({
      name: CRAYON,
      color: "#BC1022",
      brush: new fabric.CrayonBrush(canvas, {
        color: "#BC1022",
        width: 10,
        opacity: 0.1,
      }),
    })
  );
  dispatch(
    drawActions.setting({
      name: SPRAY,
      color: "#F5C71D",
      brush: new fabric.SprayBrush(canvas, {
        density: 2,
        color: "#F5C71D",
        width: 10,
      }),
    })
  );
  // dispatch(
  //   drawActions.setting({
  //     name: BACKGROUND_BRUSH,
  //     brush: new fabric.PatternBrush(canvas, {
  //       color: "black",
  //       width: 1,
  //     }),
  //   })
  // );
  dispatch(
    drawActions.setting({
      name: HIGHLIGHTER,
      color: "#AAE895",
      brush: new fabric.MarkerBrush(canvas, { color: "#AAE895", width: 10 }),
    })
  );
  // dispatch(
  //   drawActions.setting({
  //     name: INK,
  //     brush: new fabric.InkBrush(canvas, { color: "black", width: 1 }),
  //   })
  // );
  dispatch(
    drawActions.setting({
      name: ERASER,
      color: "white",
      brush: new fabric.EraserBrush(canvas, { color: "white", width: 10 }),
    })
  );
}
