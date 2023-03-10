import { useDispatch } from "react-redux";
import { categoryActions } from "../../../store/common/categorySlice";
import { nodeActions } from "../../../store/common/nodeSlice";
import { STICKER } from "../types";
import { Button } from "../style";

export default function StickerButton() {
  const dispatch = useDispatch();

  const stickerButtonClick = () => {
    dispatch(categoryActions.categoryChange(STICKER));
  };

  return <Button onClick={stickerButtonClick}>스티커</Button>;
}
