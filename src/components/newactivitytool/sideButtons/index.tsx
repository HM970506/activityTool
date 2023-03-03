import { Button, ButtonBox } from "../style";
import PhotoButton from "./photo";
import RecordButton from "./record";
import StickerButton from "./sticker";
import TextButton from "./text";
import ToolsButton from "./tools";

export default function SideButtons({
  activitytoolsEnd,
}: {
  activitytoolsEnd: any;
}) {
  return (
    <ButtonBox>
      <TextButton />
      <RecordButton />
      <PhotoButton />
      <StickerButton />
      <ToolsButton />
      <Button onClick={activitytoolsEnd}>활동툴 닫기</Button>
    </ButtonBox>
  );
}
