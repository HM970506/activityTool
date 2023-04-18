import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, ButtonBox } from "../styles/indexStyle";
import PhotoButton from "./photo";
import RecordButton from "./record";
import StickerButton from "./sticker";
import TextButton from "./text";
import DrawToolsButton from "./drawTools";
import DecorationButton from "./decoration";
import { DECORATION, ReducersType } from "../types";

export default function SideButtons({
  activitytoolsEnd,
}: {
  activitytoolsEnd: Function;
}) {
  const { view, category } = useSelector(
    (state: ReducersType) => state.categoryReducer
  );
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);

  useEffect(() => {
    if (canvas) {
      if (category !== DECORATION) {
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
      <Button
        onClick={() => {
          activitytoolsEnd();
        }}
      >
        활동툴 닫기
      </Button>
    </ButtonBox>
  );
}
