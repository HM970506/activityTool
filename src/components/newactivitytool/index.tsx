import { useEffect, useRef, useState } from "react";
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
import Canvas from "./canvas";
import ToggleButton from "./bottomTools/common/toggleButton/toggleButton";

import { FabricJSEditor } from "fabricjs-react/dist/lib/editor";
import CanvasHistory from "./history";
import CanvasSave from "./save";

export default function NewActivityTool() {
  const newActivityTool = useRef<HTMLDialogElement>(null);

  const [scale, setScale] = useState({ scaleX: 1, scaleY: 1 });
  const [subButtonVisible, setSubButtonVisible] = useState<boolean>(false);
  const [activitytools, setActivitytools] = useState<boolean>(false);
  const [nodeStore, setNodeStore] = useState<any[]>([]);
  const nodes = useSelector((state: any) => state.nodeReducer.nodes); //노드 관리
  const draws = useSelector((state: any) => state.drawReducer); //펜 관리

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

  //노드목록이 수정될 때마다 노드목록의 값이 불러와지..게 할 수 없군요.
  //반대로 해야겠다. 노드목록 값이 불러와질 때마다 노드 목록을 수정합시다.
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);

  const getCanvas = () => {
    const json = localStorage.getItem("canvasData");
    if (json) {
      canvas.loadFromJSON(json, () => canvas.renderAll());
      activitytoolsStart();
    } else alert("저장된 데이터가 없습니다");
  };

  return (
    <>
      <Background ref={newActivityTool}>
        <Overlay>
          <ToggleButton />
          <BottomTools />
          <CanvasHistory />
          <CanvasSave />
          <SideButtons activitytoolsEnd={activitytoolsEnd} />
          <Canvas />
        </Overlay>
      </Background>

      {!activitytools && (
        <>
          <MainButton onClick={mainClick}>활동툴</MainButton>
          {subButtonVisible && (
            <>
              <LoadButton onClick={getCanvas}>불러오기</LoadButton>
              <NewButton onClick={activitytoolsStart}>새로하기</NewButton>
            </>
          )}
        </>
      )}
    </>
  );
}
