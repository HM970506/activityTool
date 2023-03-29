import { useDispatch, useSelector } from "react-redux";
import { SideButton } from "../style";
import { fabric } from "fabric";
import { BIG, MIDIUM, SMALL, TEXT } from "../types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import style from "styled-components";
import { zoomActions } from "../../../store/common/zoomSlice";
import nodeSlice, { nodeActions } from "../../../store/common/nodeSlice";

export default function TextMenu() {
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const textAreaRef = useSelector((state: any) => state.nodeReducer.textarea);
  const zoom = useSelector((state: any) => state.zoomReducer.zoom);

  fabric.Canvas.prototype.getAbsoluteCoords = (object: any) => {
    return {
      left: object.left + canvas._offset?.left,
      top: object.top + canvas._offset.top,
    };
  };

  const dispatch = useDispatch();

  const test = (textbox: any) => {
    if (textAreaRef.current) {
      textbox.opacity = 0;
      textAreaRef.current.style.display = "block";
      textAreaRef.current.style.width = textbox.width * zoom + "px";
      textAreaRef.current.style.height = textbox.height * zoom + "px";
      textAreaRef.current.style.left = textbox.left * zoom + "px";
      textAreaRef.current.style.top = textbox.top * zoom + "px";
      textAreaRef.current.style.transformOrigin = "left top";
      textAreaRef.current.style.transform = `scale(${textbox.zoomX}, ${textbox.zoomY}) rotate(${textbox.angle}deg)`;
      textAreaRef.current.style.fontSize =
        textbox.getCurrentCharFontSize() + "px";
      textAreaRef.current.style.fontFamily = textbox.fontFamily;
      textAreaRef.current.value = textbox.text;
      textbox.hasControls = false;
      textAreaRef.current.focus();
      canvas.renderAll();
    }
  };
  const nowTextbox = useSelector((state: any) => state.nodeReducer.nowTextbox);
  useEffect(() => {
    if (nowTextbox != null) {
      test(nowTextbox);
      dispatch(nodeActions.setTextbox(null));
    }
  }, [nowTextbox]);

  const TextMaker = (size: number) => {
    const textbox = new fabric.Textbox(
      "텍스트를 입력하세요",
      {
        left: window.innerWidth / 2,
        top: window.innerHeight / 2,
        color: "black",
        width: 400,
        height: 30,
        editable: true,
        fontSize: size,
        selectable: true,
      },
      [zoom]
    );

    textbox.__eventListeners["mousedblclick"] = [];
    textbox.__eventListeners["tripleclick"] = [];
    textbox.__eventListeners["mousedown"] = [];

    textbox.on("mousedblclick", () => {
      dispatch(nodeActions.setTextbox(textbox));
    });

    textbox.on("mousedown", () => {
      textAreaRef.current.value = textbox.text;
    });

    textbox.on("moving", () => {
      if (textAreaRef.current) {
        textAreaRef.current.style.left = textbox.left;
        textAreaRef.current.style.top = textbox.top;
      }
    });
    textbox.on("scaling", () => {
      if (textAreaRef.current) {
        textAreaRef.current.style.width = textbox.width + "px";
        textAreaRef.current.style.height = textbox.height + "px";
      }
    });
    textbox.on("deselected", () => {
      if (textAreaRef.current) {
        textbox.text = textAreaRef.current.value;
        textAreaRef.current.style.display = "none";
        textbox.hasControls = true;
        textbox.opacity = 1;

        canvas.renderAll();
      }
    });

    canvas.add(textbox);

    canvas.renderAll();
  };

  return (
    <>
      <SideButton
        size={BIG}
        onClick={() => {
          TextMaker(BIG);
        }}
      >
        큰 글자
      </SideButton>
      <SideButton
        onClick={() => {
          TextMaker(MIDIUM);
        }}
        size={MIDIUM}
      >
        중간 글자
      </SideButton>
      <SideButton
        onClick={() => {
          TextMaker(SMALL);
        }}
        size={SMALL}
      >
        작은 글자
      </SideButton>
    </>
  );
}
