import { useRef, useState } from "react";
import { MeatballsMenuButton, Menu, Menus } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { ReducersType } from "../types";
import { categoryActions } from "../../../store/common/categorySlice";
import { nodeActions } from "../../../store/common/nodeSlice";
import { zoomActions } from "../../../store/common/zoomSlice";
import { photoEditorActions } from "../../../store/common/photoEditorSlice";
import { ButtonInner, TempLink } from "../style";
import { ReactComponent as More } from "./svg/more.svg";
import { ReactComponent as Download } from "./svg/download.svg";
import { ReactComponent as Refrash } from "./svg/refrash.svg";
import { ReactComponent as Information } from "./svg/information.svg";
import { useSpring } from "react-spring";
import { saveJson } from "../common/saveFunction";
import { getFirestoreData, getStorageData } from "../../api/firestore/getData";

export default function MeatballsMenu() {
  const dispatch = useDispatch();
  const linkRef = useRef<HTMLAnchorElement>(null);
  const { canvas, record } = useSelector(
    (state: ReducersType) => state.nodeReducer
  );
  const { memberCode, bookCode, page } = useSelector(
    (state: ReducersType) => state.firestoreReducer
  );
  const meatball = useSelector(
    (state: ReducersType) => state.categoryReducer.meatball
  );

  const reset = () => {
    canvas.clear();
    canvas.clearHistory();

    dispatch(nodeActions.reset());
    dispatch(categoryActions.reset());
    dispatch(zoomActions.reset());
    dispatch(photoEditorActions.reset());

    dispatch(categoryActions.setMeatball(false));
  };

  const saveToPng = () => {
    const pngData = canvas.toDataURL("png");
    if (linkRef.current) {
      linkRef.current.href = pngData;
      linkRef.current.download = "test";
      linkRef.current?.click();
    }
  };

  const props = useSpring({
    from: meatball
      ? { backgroundColor: "white", fill: "#292825" }
      : { backgroundColor: "#292825", fill: "white" },
    to: meatball
      ? { backgroundColor: "#292825", fill: "white" }
      : { backgroundColor: "white", fill: "#292825" },
  });

  const saveToJson = async () => {
    dispatch(nodeActions.setLoading(true));
    await saveJson(canvas, record, `common`);
    dispatch(nodeActions.setLoading(false));
  };

  const getSaveJson = async () => {
    dispatch(nodeActions.setLoading(true));
    const data = await getFirestoreData("saveData", `common`);
    const record = await getStorageData(
      `${memberCode}/${bookCode}/${page}/record`
    );

    if (data) {
      if (record) dispatch(nodeActions.setRecord(record));
      canvas.loadFromJSON(data?.data, () => canvas.renderAll());
    }
    dispatch(nodeActions.setLoading(false));
  };

  return (
    <>
      <TempLink ref={linkRef} target="_blank" />
      {meatball && (
        <Menus>
          <Menu onClick={reset}>
            <p>처음부터 다시하기</p>
            <p>
              <Refrash />
            </p>
          </Menu>
          <Menu onClick={saveToPng}>
            <p>이미지로 저장하기</p>
            <p>
              <Download />
            </p>
          </Menu>
          <Menu onClick={getSaveJson}>
            <p>불러오기</p>
            <p>
              <Information />
            </p>
          </Menu>
        </Menus>
      )}
      <MeatballsMenuButton
        onClick={() => {
          dispatch(categoryActions.setMeatball(!meatball));
        }}
      >
        <ButtonInner style={props}>
          <More />
        </ButtonInner>
      </MeatballsMenuButton>
    </>
  );
}
