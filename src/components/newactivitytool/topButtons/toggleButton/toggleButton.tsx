import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { drawActions } from "../../../../store/common/drawSlice";
import { selectActions } from "../../../../store/common/selectSlice";
import { Label, Toggle, Slider } from "./style";

export default function ToggleButton() {
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const dispatch = useDispatch();
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);

  const onclick = () => {
    setIsCheck((x) => !x);
  };

  useEffect(() => {
    if (canvas) {
      canvas.discardActiveObject().renderAll();
      canvas.isDrawingMode = isCheck;
      console.log(canvas.isDrawingMode);
    }
  }, [isCheck]);

  return (
    <Label>
      <Toggle type="checkbox" defaultChecked={isCheck} onClick={onclick} />
      <Slider></Slider>
    </Label>
  );
}
