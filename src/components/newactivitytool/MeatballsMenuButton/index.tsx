import { useEffect, useRef, useState } from "react";
import { MeatballsMenuButton, Menu, Menus } from "../styles/commonStyle";
import { useDispatch, useSelector } from "react-redux";
import { ReducersType } from "../types";
import { categoryActions } from "../../../store/common/categorySlice";
import { nodeActions } from "../../../store/common/nodeSlice";
import { zoomActions } from "../../../store/common/zoomSlice";
import { photoEditorActions } from "../../../store/common/photoEditorSlice";
import { drawActions } from "../../../store/common/drawSlice";
import { TempLink } from "../styles/historyButtonstyle";

export default function MeatballsMenu() {
  const [view, setView] = useState<boolean>(false);
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const dispatch = useDispatch();
  const linkRef = useRef<HTMLAnchorElement>(null);

  const reset = () => {
    canvas.clear();

    dispatch(nodeActions.reset());
    dispatch(categoryActions.reset());
    dispatch(zoomActions.reset());
    dispatch(photoEditorActions.reset());
    dispatch(drawActions.reset());

    setView(false);
  };

  const saveToPng = () => {
    const pngData = canvas.toDataURL("png");
    if (linkRef.current) {
      linkRef.current.href = pngData;
      linkRef.current.download = "test";
      linkRef.current?.click();
    }
  };

  return (
    <>
      <TempLink ref={linkRef} />
      {view && (
        <Menus>
          <Menu onClick={reset}>
            <p>처음부터 다시하기</p>
            <p>❤</p>
          </Menu>
          <Menu onClick={saveToPng}>
            <p>화면 저장하기</p>
            <p>❤</p>
          </Menu>
          <Menu>
            <p>도움말 보기</p>
            <p>❤</p>
          </Menu>
        </Menus>
      )}
      <MeatballsMenuButton
        onClick={() => {
          setView((x) => {
            return !x;
          });
        }}
      >
        미트볼
      </MeatballsMenuButton>
    </>
  );
}
