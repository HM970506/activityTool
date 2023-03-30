import { Button, SideButton, SideButtonBox } from "../style";
import { nodeActions } from "../../../store/common/nodeSlice";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../../store/common/categorySlice";
import { BIG, MIDIUM, SMALL } from "../types";
import { TEXT } from "../types";
import { useEffect } from "react";
export default function TextButton() {
  const dispatch = useDispatch();
  const nowCategory = useSelector(
    (state: any) => state.categoryReducer.category
  );
  const textButtonClick = () => {
    if (nowCategory) dispatch(categoryActions.categoryChange(TEXT));
  };

  const textAreaRef = useSelector((state: any) => state.nodeReducer.textarea);
  const zoom = useSelector((state: any) => state.zoomReducer.zoom);
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);

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

  return <Button onClick={textButtonClick}>글상자</Button>;
}
