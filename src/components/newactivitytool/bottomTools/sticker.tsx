import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fabric } from "fabric-with-erasing";
import {
  BackgroundContainer,
  ListContainer,
  ObjectButton,
  SubCategoryContainer,
  Thumbnail,
} from "../styles/bottomToolstyle";
import { getStorageDataAll } from "../../firestore/getData";
import { useQuery } from "react-query";
import {
  ImageType,
  ReducersType,
  STICKER_CATEGORY,
  stickerCategoryType,
} from "../types";

export default function StickerMenu() {
  const [stickerCategory, setStickerCategory] = useState<string>("fluffy");
  const [stickers, setStickers] = useState<any[]>([]);
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

      canvas.add(img);
      canvas.renderAll();
      canvas.setActiveObject(img);
    });
  };

  return (
    <BackgroundContainer>
      <SubCategoryContainer>
        {STICKER_CATEGORY.map((value: stickerCategoryType, key: number) => {
          return (
            <button
              key={`sticker_${key}`}
              onClick={() => {
                setStickerCategory(value.id);
              }}
            >
              {value.name}
            </button>
          );
        })}
      </SubCategoryContainer>
      <ListContainer>
        {isLoading ? (
          <div>로딩중</div>
        ) : (
          stickers.map((value, key) => (
            <ObjectButton
              key={`sticker_${stickerCategory}_${key}`}
              onClick={() => {
                addNodes(value);
              }}
            >
              <Thumbnail src={value} />
            </ObjectButton>
          ))
        )}
      </ListContainer>
    </BackgroundContainer>
  );
}
