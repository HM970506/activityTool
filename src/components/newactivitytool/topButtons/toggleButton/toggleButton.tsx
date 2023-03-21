import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { drawActions } from "../../../../store/common/drawSlice";
import { selectActions } from "../../../../store/common/selectSlice";
import { Label, Toggle, Slider } from "./style";

export default function ToggleButton() {
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const dispatch = useDispatch();
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const category = useSelector((state: any) => state.categoryReducer.category);

  //그림그리기 상태는 다음과 같을 때 바뀜.
  //1.토글 버튼을 클릭했을 때
  useEffect(() => {
    if (canvas) {
      canvas.discardActiveObject().renderAll();
      canvas.isDrawingMode = isCheck;
      dispatch(drawActions.setDraw(isCheck));
      console.log("toggle: ", isCheck, "캔버스 :", canvas.isDrawingMode);
    }
  }, [isCheck]);

  //2.카테고리가 바뀌었을 때
  useEffect(() => {
    if (category != "DRAWTOOLS") setIsCheck(false);
  }, [category]);

  return (
    <Label>
      <Toggle
        type="checkbox"
        checked={isCheck}
        onChange={(e) => setIsCheck(e.target.checked)}
      />
      <Slider></Slider>
    </Label>
  );
}
