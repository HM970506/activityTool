import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Background,
  Overlay,
  MainButton,
  SubButtonContainer,
  SubButton,
  ModalOverlay,
} from "./styles/commonStyle";
import Canvas from "./canvas/canvas";
import { getFirestoreData, getStorageData } from "../api/firestore/getData";
import { ReactQueryDevtools } from "react-query/devtools";
import { ReducersType } from "./types";
import { nodeActions } from "../../store/common/nodeSlice";
import BackButton from "./backButton";
import MeatballsMenu from "./MeatballsMenuButton";
import DownButtons from "./downbuttons";
import TopButtons from "./topButtons";
import PhotoEditor from "./downbuttons/photo/photoEditor/photoEditor";
import { categoryActions } from "../../store/common/categorySlice";

export default function NewActivityTool() {
  const option = useSelector(
    (state: ReducersType) => state.categoryReducer.option
  );

  const newActivityTool = useRef<HTMLDialogElement>(null);
  const [activitytools, setActivitytools] = useState<boolean>(false);
  const [subMenu, setSubMenu] = useState<boolean>(false);
  const dispatch = useDispatch();
  const isEditing = useSelector(
    (state: ReducersType) => state.photoEditorReducer.isEditing
  );
  const { canvas, record } = useSelector(
    (state: ReducersType) => state.nodeReducer
  );

  useEffect(() => {
    if (activitytools) newActivityTool.current?.showModal();
    else newActivityTool.current?.close();
  }, [activitytools]);

  const activityStart = () => {
    setActivitytools(true);
    setSubMenu(false);
  };

  const getCanvas = async () => {
    const href = window.location.href.replaceAll("/", "_");
    const data = await getFirestoreData("saveData", href);
    const record = await getStorageData("test");

    if (data) {
      if (record) dispatch(nodeActions.setRecord(record));
      canvas.loadFromJSON(data?.data, () => canvas.renderAll());
    }
    setActivitytools(true);
    setSubMenu(false);
  };

  return (
    <>
      <Background ref={newActivityTool}>
        <Overlay>
          <Canvas />
          {isEditing ? (
            <PhotoEditor />
          ) : (
            <>
              <TopButtons />
              <BackButton setActivitytools={setActivitytools} />

              <MeatballsMenu />
              <ReactQueryDevtools />
              {option && (
                <ModalOverlay
                  onClick={() => {
                    dispatch(categoryActions.optionChange(false));
                  }}
                />
              )}
              <DownButtons />
            </>
          )}
        </Overlay>
      </Background>
      {!activitytools && (
        <>
          {subMenu && (
            <SubButtonContainer>
              <SubButton onClick={activityStart}>새로하기</SubButton>
              <SubButton onClick={getCanvas}>불러오기</SubButton>
            </SubButtonContainer>
          )}
          <MainButton
            onClick={() => {
              setSubMenu((x) => !x);
            }}
          >
            활동툴
          </MainButton>
        </>
      )}
    </>
  );
}
