import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Background,
  Overlay,
  MainButton,
  SubButtonContainer,
  SubButton,
  Icon,
  Loading,
} from "./style";
import Canvas from "./canvas/canvas";
import { getFirestoreData, getStorageData } from "../api/firestore/getData";
import { ReducersType } from "./types";
import { nodeActions } from "../../store/common/nodeSlice";
import BackButton from "./backButton";
import MeatballsMenu from "./MeatballsMenuButton";
import DownButtons from "./downbuttons";
import TopButtons from "./topButtons";
import PhotoEditor from "./downbuttons/photo/photoEditor";
import { categoryActions } from "../../store/common/categorySlice";
import { zoomActions } from "../../store/common/zoomSlice";
import { photoEditorActions } from "../../store/common/photoEditorSlice";

export default function NewActivityTool() {
  const newActivityTool = useRef<HTMLDivElement>(null);
  const [activitytools, setActivitytools] = useState<boolean>(true);
  const [subMenu, setSubMenu] = useState<boolean>(false);
  const dispatch = useDispatch();
  const isEditing = useSelector(
    (state: ReducersType) => state.photoEditorReducer.isEditing
  );
  const { memberCode, bookCode, page } = useSelector(
    (state: ReducersType) => state.firestoreReducer
  );
  const { canvas, loading } = useSelector(
    (state: ReducersType) => state.nodeReducer
  );

  useEffect(() => {
    if (newActivityTool.current)
      dispatch(nodeActions.setDialogContainer(newActivityTool.current));
  }, [newActivityTool.current]);

  const activityStart = () => {
    canvas.clear();
    canvas.clearHistory();

    dispatch(nodeActions.reset());
    dispatch(categoryActions.reset());
    dispatch(zoomActions.reset());
    dispatch(photoEditorActions.reset());

    setActivitytools(true);
    setSubMenu(false);
  };

  const getCanvas = async () => {
    canvas.clearHistory();

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
    setActivitytools(true);
    setSubMenu(false);
  };

  const getMaxZIndex = () => {
    return Math.max(
      ...Array.from(document.querySelectorAll("body *"), (el) =>
        parseFloat(window.getComputedStyle(el).zIndex)
      ).filter((zIndex) => !Number.isNaN(zIndex)),
      0
    );
  };

  return (
    <>
      {loading && <Loading>Loading..</Loading>}
      <Background
        ref={newActivityTool}
        z={getMaxZIndex() + 1}
        view={activitytools ? 1 : 0}
      >
        <Overlay>
          <Canvas />
          {isEditing ? (
            <PhotoEditor />
          ) : (
            <>
              <TopButtons />
              <BackButton setActivitytools={setActivitytools} />

              <MeatballsMenu />
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
            <Icon src={"/index/document.png"} />
          </MainButton>
        </>
      )}
    </>
  );
}
