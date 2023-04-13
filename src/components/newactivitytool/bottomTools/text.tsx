import { useDispatch, useSelector } from "react-redux";
import { fabric } from "fabric";
import { deleteProps } from "../setting/deleteButton";
import { useQuery, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { FontButton } from "./style";

export default function TextMenu() {
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const textAreaContainer = useSelector(
    (state: any) => state.nodeReducer.textareaContainer
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
