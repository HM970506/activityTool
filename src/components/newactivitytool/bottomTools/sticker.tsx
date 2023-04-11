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
  const [stickerCategory, setStickerCategory] = useState<string>("");
  const [stickers, setStickers] = useState<string[] | undefined>([]);
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const { data, isLoading } = useQuery(
    `sticker_${stickerCategory}`,
    () => {
      return getStorageDataAll(`bottomTools/sticker/${stickerCategory}`);
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );

  //카테고리목록을 따로 받아와야 할 정도로 스티커가 많을까?
  //일단 카테고리별로 나눠서 눌렀을 때만 받아와야하는 건 맞는데..
  //그럼 카테고리 수만큼 useQuery가 있어야 해?
  //하나의 쿼리에 계속 추가하는 방식을 선택하는 게 나으려나
  //useQuery랑 useState를 섞어쓸 수 있나..

  useEffect(() => {
    setStickerCategory("fluffy");
  }, []);

  useEffect(() => {
    console.log(stickerCategory);
    //스티커카테고리에 따라 다른 url로 api를 호출, 데이터를 가져온다
    if (!isLoading) {
      console.log(data);
      setStickers(data);
    }
  }, [stickerCategory]);

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
          <Loading />
        ) : (
          Array.isArray(stickers) &&
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
