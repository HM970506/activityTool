import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fabric } from "fabric-with-erasing";
import {
  BackgroundContainer,
  ListContainer,
  ObjectButton,
  SubCategoryContainer,
} from "../../styles/bottomToolstyle";
import { getStorageDataAll } from "../../../api/firestore/getData";
import { useQuery } from "react-query";
import {
  ImageType,
  ReducersType,
  STICKER_CATEGORY,
  stickerCategoryType,
} from "../../types";
import { Thumbnail } from "../decoration/style";
import {
  StickerBox,
  StickerCategory,
  StickerCategoryContainer,
  StickerListConatiner,
  StickerOptionContainer,
} from "./style";

export default function StickerMenu() {
  const [stickerCategory, setStickerCategory] = useState<string>("fluffy");
  const [stickers, setStickers] = useState<string[]>([]);
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const { data, isLoading } = useQuery(
    `sticker_${stickerCategory}`,
    async () => {
      return await getStorageDataAll(`bottomTools/sticker/${stickerCategory}`);
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (!isLoading && data) setStickers(data);
  }, [isLoading, stickerCategory]);

  const addNodes = (url: string) => {
    new fabric.Image.fromURL(url, (img: ImageType) => {
      img.selectable = true;
      img.erasable = false;
      img.hoverCursor = "auto";
      img.crossOrigin = "Anonymous";

      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();
    });
  };

  return (
    <StickerOptionContainer onClick={(e) => e.stopPropagation()}>
      <StickerCategoryContainer>
        {STICKER_CATEGORY.map((value: stickerCategoryType, key: number) => {
          return (
            <StickerCategory
              state={stickerCategory === value.id ? 1 : 0}
              key={`sticker_${key}`}
              onClick={() => {
                setStickerCategory(value.id);
              }}
            >
              {value.name}
            </StickerCategory>
          );
        })}
      </StickerCategoryContainer>
      <StickerListConatiner>
        {isLoading ? (
          <div>로딩중</div>
        ) : (
          stickers.map((value: string, key: number) => (
            <StickerBox
              key={`sticker_${stickerCategory}_${key}`}
              onClick={() => {
                addNodes(value);
              }}
            >
              <Thumbnail src={value} />
            </StickerBox>
          ))
        )}
      </StickerListConatiner>
    </StickerOptionContainer>
  );
}
