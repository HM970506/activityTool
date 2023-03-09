import { useEffect, useRef, useState } from "react";
import { Group, Text, Transformer } from "react-konva";
import { Html } from "react-konva-utils";
import { useDispatch } from "react-redux";
import { nodeActions } from "../../../store/common/nodeSlice";
import { selectActions } from "../../../store/common/selectSlice";
import { TextEditor } from "../style";
import DeleteButton from "./common/deleteButton";
import { MakerType } from "./types";

export default function TextMaker({
  shapeProps,
  index,
  shapeRef,
  trRef,
  onChange,
  isSelected,
  isNotDrawing,
  onSelectCheck,
}: MakerType) {
  const [dbclick, setDbClick] = useState<boolean>(false);
  const [nowText, setNowText] = useState<string>(shapeProps.text);

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
    <Group
      draggable={isNotDrawing}
      onClick={onSelectCheck}
      onTap={onSelectCheck}
      onDragStart={onSelectCheck}
    >
      <Text
        onDblClick={() => {
          setDbClick(true);
        }}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransform={(e) => {
          onChange({
            ...shapeProps,
            scaleX: e.target.scaleX(),
            scaleY: e.target.scaleY(),
          });
        }}
        ref={shapeRef}
        {...shapeProps}
      />
      {isSelected && (
        <>
          <Transformer ref={trRef} />
          <DeleteButton index={index} shapeProps={shapeProps} />
        </>
      )}
      {dbclick && (
        <Html groupProps={{ x, y }}>
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
        </Html>
      )}
    </Group>
  );
}
