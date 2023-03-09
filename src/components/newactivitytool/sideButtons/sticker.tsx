import { useDispatch } from "react-redux";
import { categoryActions } from "../../../store/common/categorySlice";
import { nodeActions } from "../../../store/common/nodeSlice";
import { Button } from "../style";

export default function StickerButton() {
  const dispatch = useDispatch();

  return (
    <Button
      onClick={() => {
        dispatch(categoryActions.categoryChange("STICKER"));
      }}
    >
      스티커
    </Button>
  );
}
