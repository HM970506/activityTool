import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Background, Overlay, MainButton } from "./styles/commonStyle";
import Canvas from "./canvas/canvas";
import { getFirestoreData, getStorageData } from "../api/firestore/getData";
import { ReactQueryDevtools } from "react-query/devtools";
import { ReducersType } from "./types";
import { nodeActions } from "../../store/common/nodeSlice";
import BackButton from "./backButton";
import MeatballsMenu from "./MeatballsMenuButton";
import DownButtons from "./downbuttons";
import { saveJson } from "./topButtons/saveFunction";
import TopButtons from "./topButtons";
import CheckButton from "./checkButton";

export default function NewActivityTool() {
  const newActivityTool = useRef<HTMLDialogElement>(null);
  const [activitytools, setActivitytools] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { canvas, record, isEditing } = useSelector(
    (state: ReducersType) => state.nodeReducer
  );

  const saveToJson = async () => {
    await saveJson(canvas, record);
  };

  useEffect(() => {
    if (activitytools) newActivityTool.current?.showModal();
    else newActivityTool.current?.close();
  }, [activitytools]);

  const activityStart = () => {
    setActivitytools(true);
  };

  const activityEnd = () => {
    setActivitytools(false);
    saveToJson();
  };

  const getCanvas = async () => {
    const href = window.location.href.replaceAll("/", "_");
    const data = await getFirestoreData("saveData", href);
    const record = await getStorageData("test");

    if (data) {
      if (record) dispatch(nodeActions.setOldRecord(record));

      canvas.loadFromJSON(data?.data, () => canvas.renderAll());
    } else alert("저장된 데이터가 없습니다");
  };

  return (
    <>
      <Background ref={newActivityTool}>
        <Overlay>
          <Canvas />
          {isEditing ? (
            <CheckButton onClick={activityEnd} />
          ) : (
            <>
              <TopButtons />
              <BackButton onClick={activityEnd} />
              <DownButtons />
              <MeatballsMenu />
              <ReactQueryDevtools />
            </>
          )}
        </Overlay>
      </Background>
      {!activitytools && (
        <MainButton onClick={activityStart}>활동툴</MainButton>
      )}
    </>
  );
}
