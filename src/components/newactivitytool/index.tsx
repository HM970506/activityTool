import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { getFirestoreData, getStorageData } from "../api/firestore/getData";
import { ReactQueryDevtools } from "react-query/devtools";
import { ReducersType } from "./types";
import nodeSlice, { nodeActions } from "../../store/common/nodeSlice";
import PhotoEditor from "./photoEditor/photoEditor";
import { categoryActions } from "../../store/common/categorySlice";
import { zoomActions } from "../../store/common/zoomSlice";
import { photoEditorActions } from "../../store/common/photoEditorSlice";
import { drawActions } from "../../store/common/drawSlice";

export default function NewActivityTool() {
  const newActivityTool = useRef<HTMLDialogElement>(null);
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const [subButtonVisible, setSubButtonVisible] = useState<boolean>(false);
  const [activitytools, setActivitytools] = useState<boolean>(false);
  const dispatch = useDispatch();

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
    const record = await getStorageData("test");

    if (data) {
      if (record) dispatch(nodeActions.setOldRecord(record));

      canvas.loadFromJSON(data?.data, () => canvas.renderAll());
      activitytoolsStart();
    } else alert("저장된 데이터가 없습니다");
  };

  const setCanvas = async () => {
    //캔버스 리셋
    canvas.clear();

    //리덕스 리셋
    dispatch(nodeActions.reset());
    dispatch(categoryActions.reset());
    dispatch(zoomActions.reset());
    dispatch(photoEditorActions.reset());
    dispatch(drawActions.reset());

    activitytoolsStart();
  };

  return (
    <>
      <Background ref={newActivityTool}>
        <Overlay>
          <TopButtons />
          <SideButtons activitytoolsEnd={activitytoolsEnd} />
          <Canvas />
          <PhotoEditor />
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
