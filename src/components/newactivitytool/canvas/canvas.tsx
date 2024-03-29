import { fabric } from "fabric-with-erasing";
import "fabric-history";
import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../../store/common/nodeSlice";
import { useEffect, useRef } from "react";
import { CanvasBackground } from "../style";
import fabricSetting from "./fabricSetting";
import windowSetting from "./windowSetting";
import { DEFAULT_CANVAS, DRAWTOOLS, ImageType, ReducersType } from "../types";
import canvasSetting from "./canvasSetting";
import { useGesture } from "@use-gesture/react";
import { zoomActions } from "../../../store/common/zoomSlice";
import functionSetting from "./functionSetting";
import { debounce } from "lodash";
import brushSetting from "./brushes";
import { firestoreActions } from "../../../store/common/firestoreSlice";
import { getFirestoreData, getStorageData } from "../../api/firestore/getData";

export default function Canvas() {
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const category = useSelector(
    (state: ReducersType) => state.categoryReducer.category
  );
  const { canvas, background } = useSelector(
    (state: ReducersType) => state.nodeReducer
  );
  const undo = useSelector(
    (state: ReducersType) => state.nodeReducer.history.undo
  );
  const { memberCode, bookCode, page, setting } = useSelector(
    (state: ReducersType) => state.firestoreReducer
  );

  const drawModeDebounce = debounce(() => {
    if (category === DRAWTOOLS && canvas) canvas.isDrawingMode = true;
  }, 100);

  const zoomSetting = (zoom: number) => {
    const nowZoom = Math.round(zoom * 10) / 10;

    if (nowZoom > 5) return 5;
    else if (nowZoom < 0.1) return 0.1;
    else return nowZoom;
  };

  //function setting함수를 여기 넣지 않은 이유: canvas.getPointer함수를 사용하지 못하게 됨!
  const bind = useGesture({
    onPinch: ({ origin, offset }) => {
      canvas.isDrawingMode = false;

      const nowZoom = zoomSetting(offset[0]);
      canvas.zoomToPoint(
        { x: Math.round(origin[0]), y: Math.round(origin[1]) },
        nowZoom
      );
      dispatch(zoomActions.setZoom(canvas.getZoom()));

      drawModeDebounce();
    },
  });

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

    fabricSetting();
    functionSetting(canvas);
    canvasSetting(canvas, dispatch);
    windowSetting(canvas, dispatch);
    brushSetting(canvas, dispatch);

    dispatch(nodeActions.setTextareaContainer(containerRef.current));
    dispatch(nodeActions.setCanvas(canvas));
  }, []);

  //@ts-ignore
  window.backgroundFlutterURL = (data: string) => {
    const json = JSON.parse(data);

    //@ts-ignore
    dispatch(nodeActions.setBackground(json.backgroundImg));

    //@ts-ignore
    dispatch(firestoreActions.setMemberCode(json.memberCode));

    //@ts-ignore
    dispatch(firestoreActions.setBookCode(json.title));

    //@ts-ignore
    dispatch(firestoreActions.setPage(json.pageNumber));

    dispatch(firestoreActions.setSetting(true));
  };

  useEffect(() => {
    const getCanvas = async () => {
      const data = await getFirestoreData(
        "saveData",
        `${memberCode}/${bookCode}/${page}/`
      );
      const record = await getStorageData(
        `${memberCode}/${bookCode}/${page}/record`
      );

      if (data) {
        if (record) dispatch(nodeActions.setRecord(record));
        canvas.loadFromJSON(data?.data, () => canvas.renderAll());
      }
    };

    //테스트할때는 !setting으로..
    // if (canvas && setting) {
    //   if (background) {
    //     fabric.Image.fromURL(background, (img: ImageType) => {
    //       if (img.width !== undefined && img.height !== undefined) {
    //         const canvasRatio =
    //           Math.round((canvas.width / canvas.height) * 100) / 100;
    //         const imgRatio = Math.round((img.width / img.height) * 100) / 100;
    //         const scale =
    //           canvasRatio <= imgRatio
    //             ? canvas.width / img.width
    //             : canvas.height / img.height;
    //         canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
    //           scaleX: scale,
    //           scaleY: scale,
    //           erasable: false,
    //           top: canvas.getCenter().top,
    //           left: canvas.getCenter().left,
    //           originX: "center",
    //           originY: "center",
    //         });
    //         img.crossOrigin = "Anonymous";

    //         canvas.renderAll();
    //         canvas._historySaveAction();
    //         dispatch(nodeActions.setUndo(undo + 1));
    //       }
    //     });
    //   }

    //   //캔버스 불러오기
    //   getCanvas();
    // }
  }, [canvas, setting]);

  return (
    <CanvasBackground ref={containerRef} {...bind()}>
      <canvas ref={canvasRef}></canvas>
    </CanvasBackground>
  );
}
