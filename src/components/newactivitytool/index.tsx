import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Background,
  Overlay,
  MainButton,
  SubButtonContainer,
  SubButton,
  ModalOverlay,
  Icon,
} from "./styles/style";
import Canvas from "./canvas/canvas";
import { ReactQueryDevtools } from "react-query/devtools";
import { ReducersType } from "./types";
import { nodeActions } from "../../store/common/nodeSlice";
import BackButton from "./backButton";
import DownButtons from "./downbuttons";
import TopButtons from "./topButtons";
import { categoryActions } from "../../store/common/categorySlice";
import { zoomActions } from "../../store/common/zoomSlice";
import { photoEditorActions } from "../../store/common/photoEditorSlice";
import React from "react";

export default function NewActivityTool() {
  const newActivityTool = useRef<HTMLDivElement>(null);
  const [activitytools, setActivitytools] = useState<boolean>(false);
  const [subMenu, setSubMenu] = useState<boolean>(false);
  const dispatch = useDispatch();

  const { canvas } = useSelector((state: ReducersType) => state.nodeReducer);

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
      <Background
        ref={newActivityTool}
        z={getMaxZIndex() + 1}
        view={activitytools ? 1 : 0}
      >
        <Overlay>
          <Canvas />

          <TopButtons />
          <BackButton setActivitytools={setActivitytools} />
          <ReactQueryDevtools />

          <DownButtons />
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
            <Icon src={"/diary/index/document.png"} />
          </MainButton>
        </>
      )}
    </>
  );
}
