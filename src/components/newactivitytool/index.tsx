import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Background,
  Overlay,
  LoadButton,
  MainButton,
  NewButton,
} from "./style";
import SideButtons from "./sideButtons";
import Canvas from "./canvas/canvas";
import TopButtons from "./topButtons";
import { saveJson } from "./topButtons/saveButton/save";
import { getFirestoreData } from "../firestore/getData";

interface DATA {
  data: string;
  record: null | string;
  timestampe: Date;
}

export default function NewActivityTool() {
  const newActivityTool = useRef<HTMLDialogElement>(null);
  const [subButtonVisible, setSubButtonVisible] = useState<boolean>(false);
  const [activitytools, setActivitytools] = useState<boolean>(false);
  const dispatch = useDispatch();

  //할일.버튼 메모이제이션

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

  //저장 관련 부분 시작--------------------------------------
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);

  const getCanvas = async () => {
    const href = window.location.href.replaceAll("/", "_");
    const data = await getFirestoreData("saveData", href);
    if (data) {
      canvas.loadFromJSON(data?.data, () => canvas.renderAll());
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
                  getCanvas();
                }}
              >
                불러오기
              </LoadButton>
              <NewButton
                onClick={() => {
                  canvas.clear();
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
