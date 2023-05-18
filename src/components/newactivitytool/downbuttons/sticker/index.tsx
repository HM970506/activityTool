import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../../../store/common/categorySlice";
import { ReducersType, STICKER } from "../../types";
import { Button } from "../../style";
import { useQuery } from "react-query";
import { getStorageDataAll } from "../../../api/firestore/getData";
import StickerMenu from "./sticker";
import { StickerInnerBox } from "./style";
import { useEffect, useState } from "react";

export default function StickerButton() {
  const category = useSelector(
    (state: ReducersType) => state.categoryReducer.category
  );
  const option = useSelector(
    (state: ReducersType) => state.categoryReducer.option
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
    if (category !== STICKER) {
      dispatch(categoryActions.categoryChange(STICKER));
      dispatch(categoryActions.optionChange(true));
    } else {
      dispatch(categoryActions.categoryChange(""));
      dispatch(categoryActions.optionChange(false));
    }
  };

  return (
    <>
      <Button onClick={stickerButtonClick}>
        {category === STICKER && option && <StickerMenu />}
        <StickerInnerBox state={option ? 1 : 0}>스티커</StickerInnerBox>
      </Button>
    </>
  );
}
