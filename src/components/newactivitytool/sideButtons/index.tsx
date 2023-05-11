import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, ButtonBox } from "../styles/commonStyle";
import PhotoButton from "../downbuttons/photo";
import RecordButton from "../downbuttons/record";
import StickerButton from "../downbuttons/sticker";
import TextButton from "../downbuttons/text";
import DrawToolsButton from "../downbuttons/drawTools";
import DecorationButton from "../downbuttons/decoration";
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
        canvas.tape.state = 0;
        canvas.stamp.state = 0;
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
