import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../../../store/common/categorySlice";
import { ReducersType, STICKER } from "../../types";
import { Button } from "../../style";
import { useQuery } from "react-query";
import { getStorageDataAll } from "../../../api/firestore/getData";
import StickerMenu from "./sticker";
import { Icon, StickerInnerBox } from "./style";
import { useSpring } from "react-spring";

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

  const props = useSpring({
    from:
      category === STICKER && option
        ? { backgroundColor: "white", fill: "#FFAB44" }
        : { backgroundColor: "#FFAB44", fill: "white" },
    to:
      category === STICKER && option
        ? { backgroundColor: "#FFAB44", fill: "white" }
        : { backgroundColor: "white", fill: "#FFAB44" },
  });

  return (
    <>
      <Button onClick={stickerButtonClick}>
        {category === STICKER && option && <StickerMenu />}
        <StickerInnerBox style={props}>
          <Icon src="/diary/sticker/sticker.png" />
        </StickerInnerBox>
      </Button>
    </>
  );
}
