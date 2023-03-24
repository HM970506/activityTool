import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonBox } from "../style";
import PhotoButton from "./photo";
import RecordButton from "./record";
import StickerButton from "./sticker";
import TextButton from "./text";
import DrawToolsButton from "./drawTools";
import DecorationButton from "./decoration";

export default function SideButtons({
  activitytoolsEnd,
}: {
  activitytoolsEnd: any;
}) {
  const dispatch = useDispatch();
  const category = useSelector((state: any) => state.categoryReducer.category);

  return (
    <ButtonBox>
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
