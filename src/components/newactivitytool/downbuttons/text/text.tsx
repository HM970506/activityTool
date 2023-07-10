import { useDispatch, useSelector } from "react-redux";
import { fabric } from "fabric-with-erasing";
import { useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { DEFUALT_TEXTBOX, ReducersType, textType } from "../../types";
import { FontButton, TextOptionContainer } from "./style";
import { isMobile } from "react-device-detect";
import { categoryActions } from "../../../../store/common/categorySlice";
import React from "react";

export default function TextMenu() {
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const textAreaContainer = useSelector(
    (state: ReducersType) => state.nodeReducer.textareaContainer
  );
  const dispatch = useDispatch();
  const [texts, setTexts] = useState<textType[]>([]);
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData("text");

  useEffect(() => {
    if (Array.isArray(data)) setTexts(data);
  }, [data]);

  const TextMaker = (font: string) => {
    const textbox = new fabric.Textbox("텍스트를 입력하세요", {
      erasable: false,
      left: window.innerWidth / 2,
      top: window.innerHeight / 2,
      ...DEFUALT_TEXTBOX,
      hiddenTextareaContainer: textAreaContainer,
      fontFamily: font,
    });

    textbox.on({
      "editing:entered": () => {
        if (isMobile) dispatch(categoryActions.setView(false));
      },
      "editing:exited": () => {
        if (isMobile) dispatch(categoryActions.setView(true));
      },
    });

    canvas.add(textbox);
    canvas.setActiveObject(textbox);
    canvas.renderAll();
  };

  return (
    <TextOptionContainer onClick={(e) => e.stopPropagation()}>
      {data ? (
        texts.map((value: textType, key: number) => {
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
    </TextOptionContainer>
  );
}
