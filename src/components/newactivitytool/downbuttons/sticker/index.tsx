import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../../../store/common/categorySlice";
import { ReducersType, STICKER } from "../../types";
import { Button } from "../../styles/commonStyle";
import { useQuery } from "react-query";
import { getStorageDataAll } from "../../../api/firestore/getData";
import StickerMenu from "./sticker";
import { StickerInnerBox } from "./style";
import { useEffect, useState } from "react";

export default function StickerButton() {
  const [isOpen, setIsOpen] = useState<number>(0);
  const category = useSelector(
    (state: ReducersType) => state.categoryReducer.category
  );
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
    if (category !== STICKER) dispatch(categoryActions.categoryChange(STICKER));
    else dispatch(categoryActions.categoryChange(""));
  };

  useEffect(() => {
    if (category !== STICKER) setIsOpen(0);
    else setIsOpen(1);
  }, [category]);

  return (
    <>
      <Button onClick={stickerButtonClick}>
        {category === STICKER && <StickerMenu />}
        <StickerInnerBox state={isOpen}>스티커</StickerInnerBox>
      </Button>
    </>
  );
}
