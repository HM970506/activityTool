import { useSelector } from "react-redux";
import { ToolBox } from "../style";
import PhotoMenu from "./photo";
import RecordMenu from "./record";
import StickerMenu from "./sticker";
import ToolsMenu from "./tools";

export default function BottomTools() {
  const nowCategory = useSelector(
    (state: any) => state.categoryReducer.category
  );

  return (
    <ToolBox>
      {(nowCategory === "TOOLS" || nowCategory === "TEXT") && <ToolsMenu />}
      {nowCategory === "RECORD" && <RecordMenu />}
      {nowCategory === "PHOTO" && <PhotoMenu />}
      {nowCategory === "STICKER" && <StickerMenu />}
    </ToolBox>
  );
}
