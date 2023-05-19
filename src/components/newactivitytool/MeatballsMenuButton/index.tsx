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

  const props = useSpring({
    from: view
      ? { backgroundColor: "white", fill: "#292825" }
      : { backgroundColor: "#292825", fill: "white" },
    to: view
      ? { backgroundColor: "#292825", fill: "white" }
      : { backgroundColor: "white", fill: "#292825" },
  });

  return (
    <>
      <TempLink ref={linkRef} />
      {view && (
        <Menus>
          <Menu onClick={reset}>
            <p>처음부터 다시하기</p>
            <p>
              <Refrash />
            </p>
          </Menu>
          <Menu onClick={saveToPng}>
            <p>화면 저장하기</p>
            <p>
              <Download />
            </p>
          </Menu>
          <Menu>
            <p>도움말 보기</p>
            <p>
              <Information />
            </p>
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
        <ButtonInner style={props}>
          <More />
        </ButtonInner>
      </MeatballsMenuButton>
    </>
  );
}
