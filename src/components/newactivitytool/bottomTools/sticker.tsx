import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fabric } from "fabric-with-erasing";
import {
  BackgroundContainer,
  ListContainer,
  LoadingContainer,
  ObjectButton,
  SubCategoryContainer,
  Thumbnail,
} from "./style";
import { getStorageDataAll } from "../../firestore/getData";
import { useQuery } from "react-query";
import { Loading } from "../commonFunction";

export default function StickerMenu() {
  const [stickerCategory, setStickerCategory] = useState<string>("fluffy");
  const [stickers, setStickers] = useState<any[]>([]);
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
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
    if (!isLoading && data != undefined) setStickers(data);
  }, [isLoading, stickerCategory]);

  const addNodes = (url: string) => {
    new fabric.Image.fromURL(url, (img: any) => {
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
        <button
          onClick={() => {
            setStickerCategory("fluffy");
          }}
        >
          인형
        </button>
        <button
          onClick={() => {
            setStickerCategory("object");
          }}
        >
          인형아님
        </button>
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
