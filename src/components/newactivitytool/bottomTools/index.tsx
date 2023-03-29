import { useSelector } from "react-redux";
import { BottomContainer, ToolBox } from "../style";
import PhotoMenu from "./photo";
import RecordMenu from "./record";
import StickerMenu from "./sticker";
import DrawToolsMenu from "./drawTools";
import { DECORATION, DRAWTOOLS, PHOTO, RECORD, STICKER, TEXT } from "../types";
import TextMenu from "./text";
import DecorationMenu from "./decoration";
import Colorbox from "./colorbox";

export default function BottomTools() {
  const nowCategory = useSelector(
    (state: any) => state.categoryReducer.category
  );

  return (
    <BottomContainer>
      <Colorbox />
      <ToolBox>
        {nowCategory === DRAWTOOLS && <DrawToolsMenu />}
        {nowCategory === RECORD && <RecordMenu />}
        {nowCategory === PHOTO && <PhotoMenu />}
        {nowCategory === STICKER && <StickerMenu />}
        {nowCategory === TEXT && <TextMenu />}
        {nowCategory === DECORATION && <DecorationMenu />}
      </ToolBox>
    </BottomContainer>
  );
}
