import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  Background,
  Overlay,
  LoadButton,
  MainButton,
  NewButton,
} from "./styles/indexStyle";
import SideButtons from "./sideButtons";
import Canvas from "./canvas/canvas";
import TopButtons from "./topButtons";
import { getFirestoreData } from "../firestore/getData";
import { ReactQueryDevtools } from "react-query/devtools";

export default function NewActivityTool() {
  const newActivityTool = useRef<HTMLDialogElement>(null);
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const [subButtonVisible, setSubButtonVisible] = useState<boolean>(false);
  const [activitytools, setActivitytools] = useState<boolean>(false);

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

  const getCanvas = async () => {
    const href = window.location.href.replaceAll("/", "_");
    const data = await getFirestoreData("saveData", href);
    if (data) {
      canvas.loadFromJSON(data?.data, () => canvas.renderAll());
      activitytoolsStart();
    } else alert("저장된 데이터가 없습니다");
  };

  const setCanvas = async () => {
    canvas.clear();
    activitytoolsStart();
  };

  return (
    <>
      <Background ref={newActivityTool}>
        <Overlay>
          <TopButtons />
          <SideButtons activitytoolsEnd={activitytoolsEnd} />
          <Canvas />
          <ReactQueryDevtools />
        </Overlay>
      </Background>
      {!activitytools && (
        <>
          <MainButton onClick={mainClick}>활동툴</MainButton>
          {subButtonVisible && (
            <>
              <LoadButton onClick={getCanvas}>불러오기</LoadButton>
              <NewButton onClick={setCanvas}>새로하기</NewButton>
            </>
          )}
        </>
      )}
    </>
  );
}
