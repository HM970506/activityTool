import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../../../store/common/categorySlice";
import { DRAWTOOLS, ReducersType } from "../../types";
import { ToolNow, ToolNowBox, ToolsContatiner } from "./style";

import DrawToolsMenu from "./drawTools";

export default function DrawToolsButton() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<number>(0);
  const [select, setSelect] = useState<string>("");
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const category = useSelector(
    (state: ReducersType) => state.categoryReducer.category
  );

  useEffect(() => {
    if (category === DRAWTOOLS) setIsOpen(1);
    else setIsOpen(0);
  }, [category]);

  const drawToolStart = () => {
    if (category !== DRAWTOOLS) {
      dispatch(categoryActions.categoryChange(DRAWTOOLS));
      canvas.isDrawingMode = true;
    }
  };

  const drawToolsEnd = () => {
    if (category === DRAWTOOLS) {
      dispatch(categoryActions.categoryChange(""));
      canvas.isDrawingMode = false;
    }
  };

  return (
    <ToolsContatiner onClick={drawToolStart} state={isOpen}>
      <ToolNowBox onClick={drawToolsEnd} state={isOpen}>
        <ToolNow state={isOpen}>
          <p>{select}</p>
        </ToolNow>
      </ToolNowBox>
      {isOpen ? <DrawToolsMenu setSelect={setSelect} select={select} /> : null}
    </ToolsContatiner>
  );
}
