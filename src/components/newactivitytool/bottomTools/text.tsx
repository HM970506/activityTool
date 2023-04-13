import { useDispatch, useSelector } from "react-redux";
import { SideButton } from "../style";
import { fabric } from "fabric";
import { deleteProps } from "../setting/deleteButton";
import { useQuery } from "react-query";
import { getFirestoreData, getStorageDataAll } from "../../firestore/getData";
import { useEffect, useState } from "react";
import { FontButton } from "./style";

export default function TextMenu() {
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const textAreaContainer = useSelector(
    (state: any) => state.nodeReducer.textareaContainer
  );
  const [texts, setTexts] = useState<any[]>([]);
  const { data: font, isLoading: fontLoading } = useQuery(
    `text_font`,
    async () => {
      return await getStorageDataAll(`bottomTools/textbox`);
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );
  const { data: fontName, isLoading: fontNameLoading } = useQuery(
    `text_fontname`,
    async () => {
      return await getFirestoreData("menu", "textbox");
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (!fontLoading && !fontNameLoading && font && fontName) {
      const data = fontName.font.map((value: string, key: number) => {
        return { name: value, url: font[key] };
      });
      setTexts(data);
    }
  }, [fontLoading, fontNameLoading]);

  fabric.Textbox.prototype.set({
    cornerColor: "black",
    selectionBorderColor: "black",
  });
  fabric.Textbox.prototype.controls.deleteControl = new fabric.Control({
    ...deleteProps,
  });

  const TextMaker = (font: string) => {
    const textbox = new fabric.Textbox("텍스트를 입력하세요", {
      left: window.innerWidth / 2,
      top: window.innerHeight / 2,
      color: "black",
      width: 400,
      height: 30,
      editable: true,
      fontSize: 30,
      selectable: true,
      hiddenTextareaContainer: textAreaContainer,
      fontFamily: font,
    });
    canvas.add(textbox);
    canvas.renderAll();
  };

  return (
    <>
      {fontNameLoading && fontLoading ? (
        <div>로딩중</div>
      ) : (
        texts.map((value: any, key: number) => {
          return (
            <FontButton
              url={value.url}
              font={value.name}
              key={`text_${key}`}
              onClick={() => {
                TextMaker(value.name);
              }}
            >
              {value.name}
            </FontButton>
          );
        })
      )}
    </>
  );
}
