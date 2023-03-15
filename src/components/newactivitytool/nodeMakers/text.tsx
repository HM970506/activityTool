import { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../../store/common/nodeSlice";
import { selectActions } from "../../../store/common/selectSlice";
import { TextEditor } from "../style";
import DeleteButton from "./common/deleteButton";
import { MakerType } from "../types";

export default function TextMaker({
  shapeProps,
  index,
  shapeRef,
  trRef,
  onChange,
  isSelected,
  onSelect,
}: MakerType) {
  const [dbclick, setDbClick] = useState<boolean>(false);
  const [nowText, setNowText] = useState<string>(shapeProps.text);
  const isDrawing = useSelector((state: any) => state.drawReducer.isDrawing);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (dbclick) {
      trRef.current?.hide();
      shapeRef.current.hide();
    } else shapeRef.current.show();
  }, [dbclick]);

  const onEdit = async () => {
    dispatch(
      nodeActions.modifyNodes({
        index: index,
        modifyProps: {
          text: textRef.current?.value,
          height: nowText.split("\n").length * 25,
        },
      })
    );
    setDbClick(false);
    dispatch(selectActions.selectChange(null));
  };

  let x = shapeProps.x - 5;
  let y = shapeProps.y - 10;

  return (
    dbclick && (
      <TextEditor
        autoFocus
        ref={textRef}
        size={shapeProps.fontSize}
        line={nowText.split("\n").length}
        onChange={(e) => {
          setNowText(e.target.value);
        }}
        value={nowText}
        onBlur={onEdit}
      />
    )
  );
}
