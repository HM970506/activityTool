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

  //isCheck--영향 단방향-->canvas
  //isCheck상태는 변할 때 그림그리기 상태를 바꿈.
  //그림그리기 상태는 변할 때 isCheck상태를 바꾸지 않음.

  //isCheck가 true인데 그림그리기 상태가 false일 수 있음. ex)그림도구 중 스탬프를 사용할 때..
  //isCheck가 false인데 그림그리기 상태가 true일 수 없음.
  useEffect(() => {
    if (canvas) {
      canvas.discardActiveObject().renderAll();
      canvas.isDrawingMode = isCheck;
      dispatch(drawActions.setDraw(isCheck));
    }
  }, [isCheck]);

  //ischeck상태는 다음과 같이 바뀜.
  //1.카테고리가 바뀌었을 때
  useEffect(() => {
    if (category != "DRAWTOOLS") setIsCheck(false);
  }, [category]);

  return (
    <Label>
      <Toggle
        type="checkbox"
        checked={isCheck}
        onChange={
          //2.토글 버튼을 클릭했을 때
          (e) => setIsCheck(e.target.checked)
        }
      />
      <Slider></Slider>
    </Label>
  );
}
