import { useEffect, useRef, useState } from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useDispatch, useSelector } from "react-redux";
import {
  Background,
  Overlay,
  LoadButton,
  MainButton,
  NewButton,
} from "./style";
import BottomTools from "./bottomTools";
import SideButtons from "./sideButtons";
import { fabric } from "fabric";

export default function NewActivityTool() {
  const newActivityTool = useRef<HTMLDialogElement>(null);

  const [scale, setScale] = useState({ scaleX: 1, scaleY: 1 });
  const [subButtonVisible, setSubButtonVisible] = useState<boolean>(false);
  const [activitytools, setActivitytools] = useState<boolean>(false);
  const [nodeStore, setNodeStore] = useState<any[]>([]);
  const nodes = useSelector((state: any) => state.nodeReducer.nodes); //노드 관리
  const draws = useSelector((state: any) => state.drawReducer); //펜 관리
  const dispatch = useDispatch();
  const firstSize = { width: window.innerWidth, height: window.innerHeight };

  const onResize = (e: any) => {
    setScale({
      scaleX: e.target.innerWidth / firstSize.width,
      scaleY: e.target.innerHeight / firstSize.height,
    });
  };

  //할일
  //1.버튼 메모이제이션
  //2.캔버스 동적 리사이징 작업

  //메모리 누수 방지를 위해 새로운 리사이즈가 생기기 전 기존 리스너를 제거해주자.
  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  //---------------------------------------------

  useEffect(() => {
    setNodeStore(nodes);
  }, [nodes]);

  //버튼 관련 부분 시작------------------------------------

  useEffect(() => {
    if (activitytools) newActivityTool.current?.showModal();
    else newActivityTool.current?.close();
  }, [activitytools]);

  const mainClick = () => {
    if (!activitytools) setSubButtonVisible((x) => !x);
    else {
      setSubButtonVisible(false);
      setActivitytools(false);
    }
  };

  const activitytoolsStart = () => {
    setSubButtonVisible(false);
    setActivitytools(true);
  };
  const activitytoolsEnd = () => {
    setActivitytools(false);
  };

  //버튼 관련 부분 끝-------------------------------------

  const { editor, onReady } = useFabricJSEditor();
  const history = new Array();
  const [color, setColor] = useState("#35363a");
  const [cropImage, setCropImage] = useState(true);

  useEffect(() => {
    if (!editor || !fabric) return;
    if (cropImage) {
      editor!.canvas.__eventListeners = {};
      return;
    }

    if (!editor!.canvas.__eventListeners["mouse:wheel"]) {
      editor!.canvas.on("mouse:wheel", function (opt: any) {
        var delta = opt.e.deltaY;
        var zoom = editor!.canvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;
        editor!.canvas.zoomToPoint(
          { x: opt.e.offsetX, y: opt.e.offsetY },
          zoom
        );
        opt.e.preventDefault();
        opt.e.stopPropagation();
      });
    }

    if (!editor!.canvas.__eventListeners["mouse:down"]) {
      editor!.canvas.on("mouse:down", function (opt) {
        if (opt.e.ctrlKey === true) {
          this.isDragging = true;
          this.selection = false;
          this.lastPosX = opt.e.clientX;
          this.lastPosY = opt.e.clientY;
        }
      });
    }

    if (!editor!.canvas.__eventListeners["mouse:move"]) {
      editor!.canvas.on("mouse:move", function (opt) {
        if (this.isDragging) {
          var vpt = this.viewportTransform;
          vpt[4] += opt.e.clientX - this.lastPosX;
          vpt[5] += opt.e.clientY - this.lastPosY;
          this.requestRenderAll();
          this.lastPosX = opt.e.clientX;
          this.lastPosY = opt.e.clientY;
        }
      });
    }

    if (!editor!.canvas.__eventListeners["mouse:up"]) {
      editor!.canvas.on("mouse:up", function (opt) {
        // on mouse up we want to recalculate new interaction
        // for all objects, so we call setViewportTransform
        this.setViewportTransform(this.viewportTransform);
        this.isDragging = false;
        this.selection = true;
      });
    }

    editor!.canvas.renderAll();
  }, [editor]);

  const addBackground = () => {
    if (!editor || !fabric) return;

    fabric.Image.fromURL("url", (image: any) => {
      editor!.canvas.setBackgroundImage(
        image,
        editor!.canvas.renderAll.bind(editor!.canvas)
      );
    });
  };

  useEffect(() => {
    if (!editor || !fabric) return;
    editor!.canvas.setHeight(500);
    editor!.canvas.setWidth(500);
    addBackground();
    editor!.canvas.renderAll();
  }, [editor?.canvas.backgroundImage]);

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }
    editor!.canvas.freeDrawingBrush.color = color;
    editor!.setStrokeColor(color);
  }, [color]);

  const toggleDraw = () => {
    if (editor) editor!.canvas.isDrawingMode = !editor!.canvas.isDrawingMode;
  };
  const undo = () => {
    if (editor!.canvas._objects.length > 0)
      history.push(editor!.canvas._objects.pop());
    editor!.canvas.renderAll();
  };
  const redo = () => {
    if (history.length > 0) editor!.canvas.add(history.pop());
  };

  const clear = () => {
    editor!.canvas._objects.splice(0, editor!.canvas._objects.length);
    history.splice(0, history.length);
    editor!.canvas.renderAll();
  };

  const removeSelectedObject = () => {
    editor!.canvas.remove(editor!.canvas.getActiveObject());
  };

  const onAddCircle = () => {
    editor!.addCircle();
  };

  const addText = () => {
    editor!.addText("inset text");
  };

  const exportSVG = () => {
    const svg = editor!.canvas.toSVG();
    console.info(svg);
  };

  return (
    <>
      <Background ref={newActivityTool}>
        <Overlay>
          <BottomTools />
          <SideButtons activitytoolsEnd={activitytoolsEnd} />
          <FabricJSCanvas className="sample-canvas" onReady={onReady} />
        </Overlay>
      </Background>

      {!activitytools && (
        <>
          <MainButton onClick={mainClick}>활동툴</MainButton>
          {subButtonVisible && (
            <>
              <LoadButton>불러오기</LoadButton>
              <NewButton onClick={activitytoolsStart}>새로하기</NewButton>
            </>
          )}
        </>
      )}
    </>
  );
}
