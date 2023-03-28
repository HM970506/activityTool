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
import ToggleButton from "./topButtons/toggleButton/toggleButton";

import { FabricJSEditor } from "fabricjs-react/dist/lib/editor";
import CanvasHistory from "./topButtons/historyButton/history";
import TopButtons from "./topButtons";
import { saveJson } from "./topButtons/saveButton/save";
import { nodeActions } from "../../store/common/nodeSlice";

export default function NewActivityTool() {
  const newActivityTool = useRef<HTMLDialogElement>(null);
  const [subButtonVisible, setSubButtonVisible] = useState<boolean>(false);
  const [activitytools, setActivitytools] = useState<boolean>(false);
  const [url, setUrl] = useState<string>(window.location.href);
  const dispatch = useDispatch();

  //할일
  //1.버튼 메모이제이션

  //버튼 관련 부분 시작------------------------------------

  useEffect(() => {
    if (activitytools) newActivityTool.current?.showModal();
    else newActivityTool.current?.close();
  }, [activitytools]);

  const urlCheck = () => {
    const nowUrl = window.location.href;
    if (nowUrl != url) {
      if (canvas) {
        saveJson(canvas); //서버에서는 url도 함께 저장할 수 있게 하기
        dispatch(nodeActions.setOpacity(255));
        dispatch(nodeActions.setZoom(1));
        canvas.clear();
      }
    }
  };

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

  //저장 관련 부분 시작--------------------------------------
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);

  const getCanvas = () => {
    const json = localStorage.getItem("canvasData");
    if (json) {
      canvas.loadFromJSON(json, () => canvas.renderAll());
      activitytoolsStart();
    } else alert("저장된 데이터가 없습니다");
  };

  //저장 관련 부분 끝------------------------------------------

  return (
    <>
      <Background ref={newActivityTool}>
        <Overlay>
          <TopButtons />
          <SideButtons activitytoolsEnd={activitytoolsEnd} />
          <Canvas />
        </Overlay>
      </Background>

      {!activitytools && (
        <>
          <MainButton onClick={mainClick}>활동툴</MainButton>
          {subButtonVisible && (
            <>
              <LoadButton
                onClick={() => {
                  urlCheck();
                  getCanvas();
                }}
              >
                불러오기
              </LoadButton>
              <NewButton
                onClick={() => {
                  urlCheck();
                  activitytoolsStart();
                }}
              >
                새로하기
              </NewButton>
            </>
          )}
        </>
      )}
    </>
  );
}
