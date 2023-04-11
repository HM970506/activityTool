import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonBox } from "../style";
import PhotoButton from "./photo";
import RecordButton from "./record";
import StickerButton from "./sticker";
import TextButton from "./text";
import DrawToolsButton from "./drawTools";
import DecorationButton from "./decoration";
import store from "../../../store/store";
import { DECORATION } from "../types";

export default function SideButtons({
  activitytoolsEnd,
}: {
  activitytoolsEnd: any;
}) {
  const { view, category } = useSelector((state: any) => state.categoryReducer);
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);

  useEffect(() => {
    if (canvas) {
      if (category != DECORATION) {
        canvas.taping = 0;
        canvas.stamping = "";
      }
    }
  }, [category]);

  return (
    <ButtonBox view={view ? 1 : 0}>
      <TextButton />
      <RecordButton />
      <PhotoButton />
      <StickerButton />
      <DecorationButton />
      <DrawToolsButton />
      <Button onClick={activitytoolsEnd}>활동툴 닫기</Button>
    </ButtonBox>
  );
}
