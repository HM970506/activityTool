import { useDispatch, useSelector } from "react-redux";
import { SideButton } from "../style";
import { fabric } from "fabric";
import { BIG, MIDIUM, SMALL, TEXT } from "../types";
import { useEffect, useRef, useState } from "react";

export default function TextMenu() {
  const dispatch = useDispatch();
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const textArea = document.createElement("textarea");
  const [isEditing, setIsEditing] = useState<string>("unselect");

  let now = new fabric.Textbox();

  useEffect(() => {
    if (isEditing == "select") {
      textArea.style.width = now.width;
      textArea.style.height = now.height;
      textArea.style.left = now.left + "px";
      textArea.style.top = now.top + "px";
      textArea.style.fontSize = now.fontSize;
      textArea.innerText = now.text;
      textArea.style.display = "absolute";
    }
    if (isEditing == "moving") {
      textArea.style.left = now.left + "px";
      textArea.style.top = now.top + "px";
    } else if (isEditing == "scale") {
      textArea.style.width = now.width;
      textArea.style.height = now.height;
    } else if (isEditing == "unselect") {
      now.text = textArea.innerText;
      textArea.style.display = "none";
    }

    console.log(isEditing, textArea);
  }, [isEditing]);

  const defaultProps = {
    left: window.innerWidth / 2,
    top: window.innerHeight / 2,
    color: "black",
    width: 400,
    height: 30,
    fontSize: 10,
    editable: true,
  };

  const TextMaker = (size: number) => {
    const node = {
      ...defaultProps,
      fontSize: size,
    };

    const textbox = new fabric.Textbox("왜 수정이 안되지", {
      ...node,
    });
    now = textbox;
    textbox.selectable = true;
    textbox.__eventListeners["mousedblclick"] = [];
    textbox.__eventListeners["tripleclick"] = [];
    textbox.__eventListeners["mousedown"] = [];

    textbox.on("mousedblclick", () => setIsEditing("select"));
    textbox.on("moving", () => setIsEditing("move"));
    textbox.on("scaling", () => setIsEditing("scale"));
    textbox.on("deselected", () => setIsEditing("unselect"));

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
