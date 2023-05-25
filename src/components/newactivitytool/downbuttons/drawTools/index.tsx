import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../../../store/common/categorySlice";
import { DRAWTOOLS, ReducersType } from "../../types";
import {
  Thumbnail,
  ThumbnailBox,
  ToolNow,
  ToolNowBox,
  ToolsContatiner,
} from "./style";
import DrawToolsMenu from "./drawTools";
import { useSpring } from "react-spring";
import { getPath } from "./datas";

export default function DrawToolsButton() {
  const dispatch = useDispatch();
  const brushes = useSelector((state: ReducersType) => state.drawReducer);
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const category = useSelector(
    (state: ReducersType) => state.categoryReducer.category
  );
  const select = useSelector((state: ReducersType) => state.drawReducer.now);
  const [isOpen, setIsOpen] = useState<number>(0);

  useEffect(() => {
    if (canvas) {
      if (category === DRAWTOOLS) {
        setIsOpen(1);
        canvas.isDrawingMode = true;
      } else {
        setIsOpen(0);
        canvas.isDrawingMode = false;
      }
    }
  }, [category]);

  useEffect(() => {
    if (select !== "" && canvas) canvas.isDrawingMode = true;
  }, [select]);

  const openHandler = () => {
    if (category !== DRAWTOOLS)
      dispatch(categoryActions.categoryChange(DRAWTOOLS));
    else dispatch(categoryActions.categoryChange(""));
  };

  //애니메이션 관련 코드 시작
  const innerBox = useSpring({
    from: isOpen
      ? {
          width: 32,
          height: 32,
          borderRadius: 16,
          margin: 17,
        }
      : { width: 64, height: 64, borderRadius: 28, margin: 4 },
    to: isOpen
      ? { width: 64, height: 64, borderRadius: 28, margin: 4 }
      : {
          width: 32,
          height: 32,
          borderRadius: 16,
          margin: 17,
        },
  });

  const outterBox = useSpring({
    from: isOpen ? { width: 72 } : { width: 420 },
    to: isOpen ? { width: 420 } : { width: 72 },
  });
  //애니메이션 관련 코드 끝

  return (
    <ToolsContatiner style={outterBox}>
      <ToolNowBox onClick={openHandler}>
        <ToolNow style={innerBox}>
          {select ? (
            <ThumbnailBox
              color={
                (brushes as any)[select]
                  ? (brushes as any)[select].color
                  : "white"
              }
            >
              <Thumbnail src={getPath(select)} />
            </ThumbnailBox>
          ) : null}
        </ToolNow>
      </ToolNowBox>
      {canvas && <DrawToolsMenu />}
    </ToolsContatiner>
  );
}
