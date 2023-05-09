import DecorationButton from "./decoration";
import DrawToolsButton from "./drawTools";
import PhotoButton from "./photo";
import RecordButton from "./record";
import StickerButton from "./sticker";
import TextButton from "./text";
import { DownButtonsContainer } from "../styles/commonStyle";

export default function DownButtons() {
  return (
    <DownButtonsContainer>
      <DrawToolsButton />
      <DecorationButton />
      <StickerButton />
      <PhotoButton />
      <TextButton />
      <RecordButton />
    </DownButtonsContainer>
  );
}
