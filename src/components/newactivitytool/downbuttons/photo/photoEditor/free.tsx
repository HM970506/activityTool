import { useEffect } from "react";
import { ReducersType } from "../../../types";
import { FreecropButton, PhotoOption2 } from "./style";

import { useDispatch, useSelector } from "react-redux";
import { photoEditorActions } from "../../../../../store/common/photoEditorSlice";

export default function FreeCrop() {
  const { photoCanvas, cropCanvas, isCroping } = useSelector(
    (state: ReducersType) => state.photoEditorReducer
  );
  const dispatch = useDispatch();

  //전체를 덮는 회색조 캔버스를 깔고
  //같은 위치에 이미지를 놓고 크로스..어쩌고를 주고
  //드래그시 사각형을 그리게 하고
  //마우스 업시 정보를 저장해뒀다 아래 캔버스에 전달

  const reset = () => {
    if (cropCanvas === null) return;
    const ordinary = photoCanvas.getObjects()[0];
    cropCanvas.clear();
    cropCanvas.add(ordinary);
    cropCanvas.renderAll();
  };

  useEffect(() => {
    if (isCroping && cropCanvas) reset();
  }, [cropCanvas]);

  const rectangleCrop = () => {
    dispatch(photoEditorActions.setIsCroping(true));
  };

  const freeCrop = () => {
    dispatch(photoEditorActions.setIsCroping(true));
  };

  return (
    <PhotoOption2 onClick={(e) => e.stopPropagation()}>
      <FreecropButton onClick={reset}>원래대로</FreecropButton>
      <FreecropButton onClick={rectangleCrop}>사각형</FreecropButton>
      <FreecropButton onClick={freeCrop}>자유</FreecropButton>
    </PhotoOption2>
  );
}
