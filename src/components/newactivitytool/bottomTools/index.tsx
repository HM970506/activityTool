import { useSelector } from "react-redux";
import { ToolBox } from "../style";
import PhotoMenu from "./photo";
import RecordMenu from "./record";
import StickerMenu from "./sticker";
import DrawToolsMenu from "./drawTools";
import { DRAWTOOLS, PHOTO, RECORD, STICKER, TEXT } from "../types";

export default function BottomTools() {
  const nowCategory = useSelector(
    (state: any) => state.categoryReducer.category
  );

  return (
    <ToolBox>
      {(nowCategory === DRAWTOOLS || nowCategory === TEXT) && <DrawToolsMenu />}
      {nowCategory === RECORD && <RecordMenu />}
      {nowCategory === PHOTO && <PhotoMenu />}
      {nowCategory === STICKER && <StickerMenu />}
    </ToolBox>
  );
}
