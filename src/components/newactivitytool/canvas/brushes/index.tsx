import { SprayBrush } from "fabric/fabric-impl";
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
      width: 30,
      brush: new fabric.CrayonBrush(canvas, {
        color: "#BC1022",
        width: 30,
        opacity: 0.6,
      }),
    })
  );

  const sprayBrush = new fabric.SprayBrush(canvas, {
    density: 10,
    color: "#FFC222",
    width: 30,
    opacity: 0.5,
    dotWidth: 1,
  });
  //속성 종종 안 먹는 경우 이렇게 한번 더 속성 정의해주기
  sprayBrush.density = 10;
  sprayBrush.color = "#FFC222";
  sprayBrush.width = 30;
  sprayBrush.opaciry = 0.5;
  sprayBrush.dotWidth = 1;
  dispatch(
    drawActions.setting({
      name: SPRAY,
      color: "#FFC222",
      width: 30,
      brush: sprayBrush,
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
      width: 30,
      brush: new fabric.MarkerBrush(canvas, {
        color: "#AAE895",
        width: 30,
        opacity: 0.2,
      }),
    })
  );
  // dispatch(
  //   drawActions.setting({
  //     name: INK,
  //     brush: new fabric.InkBrush(canvas, { color: "black", width: 1 }),
  //   })
  // );

  const eraserBrush = new fabric.EraserBrush(canvas, {
    color: "white",
    width: 30,
  });
  eraserBrush.width = 30;
  dispatch(
    drawActions.setting({
      name: ERASER,
      color: "white",
      width: 30,
      brush: eraserBrush,
    })
  );
}
