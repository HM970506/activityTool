import DecorationButton from "./decoration";
import DrawToolsButton from "./drawTools";
import PhotoButton from "./photo";
import RecordButton from "./record";
import StickerButton from "./sticker";
import TextButton from "./text";
import { DownButtonsContainer_MobilenDesktop } from "../styles/style";
import { useSelector } from "react-redux";
import { ReducersType } from "../types";

export default function DownButtons() {
  const view = useSelector((state: ReducersType) => state.categoryReducer.view);

  return (
    <DownButtonsContainer_MobilenDesktop state={view ? 1 : 0}>
      <DrawToolsButton />
      <DecorationButton />
      <StickerButton />
      <PhotoButton />
      <TextButton />
      <RecordButton />
    </DownButtonsContainer_MobilenDesktop>
  );
}
