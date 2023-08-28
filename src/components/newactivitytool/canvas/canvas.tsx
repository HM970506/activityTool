import { fabric } from "fabric-with-erasing";
import "fabric-history";
import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../../store/common/nodeSlice";
import { useEffect, useRef } from "react";
import { CanvasBackground } from "../style";
import fabricSetting from "./fabricSetting";
import windowSetting from "./windowSetting";
import { CRAYON, DEFAULT_CANVAS, ImageType, ReducersType } from "../types";
import canvasSetting from "./canvasSetting";
import brushSetting from "./brushes";
import { firestoreActions } from "../../../store/common/firestoreSlice";
import { drawActions } from "../../../store/common/drawSlice";

export default function Canvas() {
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { canvas, background } = useSelector(
    (state: ReducersType) => state.nodeReducer
  );
  const undo = useSelector(
    (state: ReducersType) => state.nodeReducer.history.undo
  );
  const { memberCode, bookCode, page, setting } = useSelector(
    (state: ReducersType) => state.firestoreReducer
  );

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      ...DEFAULT_CANVAS,
      height: window.innerHeight,
      width: window.innerWidth,
      left: window.innerWidth / 2,
      top: window.innerHeight / 2,

      pinchZoom: { state: 0, coord: { x: 0, y: 0 } },
    });
    canvas.freeDrawingBrush.inverted = true;
    canvas.isDrawingMode = true;

    fabricSetting();
    //   functionSetting(canvas);
    canvasSetting(canvas, dispatch);
    windowSetting(canvas, dispatch);
    brushSetting(canvas, dispatch);

    dispatch(nodeActions.setTextareaContainer(containerRef.current));
    dispatch(nodeActions.setCanvas(canvas));
  }, []);

  useEffect(() => {
    if (canvas) dispatch(drawActions.setNow(CRAYON));
  }, [canvas]);

  //@ts-ignore
  window.backgroundFlutterURL = (data: string) => {
    const json = JSON.parse(data);

    //@ts-ignore
    dispatch(nodeActions.setBackground(json.backgroundImg));
    //여기서 웹뷰로부터 백그라운드 이미지 정보를 받아옵니다

    dispatch(firestoreActions.setSetting(true));
  };

  useEffect(() => {
    const getCanvas = async () => {
      const data = "여기에도 저장 경로를 넣어줍니다";

      if (data) canvas.loadFromJSON(data, () => canvas.renderAll());
    };

    //테스트할때는 !setting으로..
    if (canvas && setting) {
      if (background) {
        fabric.Image.fromURL(background, (img: ImageType) => {
          if (img.width !== undefined && img.height !== undefined) {
            const canvasRatio =
              Math.round((canvas.width / canvas.height) * 100) / 100;
            const imgRatio = Math.round((img.width / img.height) * 100) / 100;
            const scale =
              canvasRatio <= imgRatio
                ? canvas.width / img.width
                : canvas.height / img.height;
            canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
              scaleX: scale,
              scaleY: scale,
              erasable: false,
              top: canvas.getCenter().top,
              left: canvas.getCenter().left,
              originX: "center",
              originY: "center",
            });
            img.crossOrigin = "Anonymous";

            canvas.renderAll();
            canvas._historySaveAction();
            dispatch(nodeActions.setUndo(undo + 1));
          }
        });
      }

      //캔버스 불러오기
      getCanvas();
    }
  }, [canvas, setting]);

  return (
    <CanvasBackground ref={containerRef}>
      <canvas ref={canvasRef}></canvas>
    </CanvasBackground>
  );
}
