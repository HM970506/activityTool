import { useSelector } from "react-redux";
import { fabric } from "fabric";
import { deleteProps } from "../setting/deleteButton";
import { useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { FontButton } from "../styles/bottomToolstyle";
import { DEFUALT_TEXTBOX, ReducersType } from "../types";

export default function TextMenu() {
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const textAreaContainer = useSelector(
    (state: ReducersType) => state.nodeReducer.textareaContainer
  );
  const [texts, setTexts] = useState<any[]>([]);
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData("text");

  useEffect(() => {
    if (Array.isArray(data)) setTexts(data);
  }, [data]);

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
      ...DEFUALT_TEXTBOX,
      hiddenTextareaContainer: textAreaContainer,
      fontFamily: font,
    });
    canvas.add(textbox);
    canvas.renderAll();
  };

  return (
    <>
      {data ? (
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
      ) : (
        <div>로딩중</div>
      )}
    </>
  );
}
