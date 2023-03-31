import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fabric } from "fabric-with-erasing";
import {
  BackgroundContainer,
  ListContainer,
  SubCategoryContainer,
} from "./style";
const sample = new Map([
  ["fluffy", ["토끼", "병아리"]],
  ["round", ["달걀프라이", "어항"]],
]);

export default function StickerMenu() {
  const [stickerCategory, setStickerCategory] = useState<string>("fluffy");
  const [stickers, setStickers] = useState<string[] | undefined>([]);
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  useEffect(() => {
    //스티커카테고리에 따라 다른 url로 api를 호출, 데이터를 가져온다
    setStickers(sample.get(stickerCategory));
  }, [stickerCategory]);

  const addNodes = (index: number) => {
    new fabric.Image.fromURL(
      `./${stickerCategory}_sticker_${index}.png`,
      (img: any) => {
        img.selectable = true;
        img.erasable = false;
        img.hoverCursor = "auto";
        canvas.add(img);
      }
    );
  };

  return (
    <BackgroundContainer>
      <SubCategoryContainer>
        <button
          onClick={() => {
            setStickerCategory("fluffy");
          }}
        >
          인형
        </button>
        <button
          onClick={() => {
            setStickerCategory("round");
          }}
        >
          인형아님
        </button>
      </SubCategoryContainer>
      <ListContainer>
        {Array.isArray(stickers) &&
          stickers.map((value, key) => (
            <button
              key={key}
              onClick={() => {
                addNodes(key + 1);
              }}
            >
              {value}
            </button>
          ))}
      </ListContainer>
    </BackgroundContainer>
  );
}
