import { useState } from "react";
import { useDispatch } from "react-redux";
import { drawActions } from "../../../../../store/common/drawSlice";
import { selectActions } from "../../../../../store/common/selectSlice";
import { Label, Toggle, Slider } from "./style";

export default function ToggleButton() {
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const dispatch = useDispatch();

  const onclick = () => {
    if (!isCheck) dispatch(drawActions.draw());
    else dispatch(drawActions.undraw());
    setIsCheck((x) => !x);
    dispatch(selectActions.selectChange(null));
  };

  return (
    <Label>
      <Toggle type="checkbox" checked={isCheck} onClick={onclick} />
      <Slider></Slider>
    </Label>
  );
}
