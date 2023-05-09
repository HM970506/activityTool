import { useDispatch } from "react-redux";
import { categoryActions } from "../../../store/common/categorySlice";
import { STICKER } from "../types";
import { Button } from "../styles/commonStyle";
import { useQuery } from "react-query";
import { getStorageDataAll } from "../../api/firestore/getData";

export default function StickerButton() {
  const dispatch = useDispatch();
  useQuery(
    `sticker_fluffy`,
    async () => {
      return await getStorageDataAll(`bottomTools/sticker/fluffy`);
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );
  useQuery(
    `sticker_object`,
    async () => {
      return await getStorageDataAll(`bottomTools/sticker/object`);
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );

  const stickerButtonClick = () => {
    dispatch(categoryActions.categoryChange(STICKER));
  };

  return <Button onClick={stickerButtonClick}>스티커</Button>;
}
