import { useRef, useState } from "react";
import { Group, Text, Transformer } from "react-konva";
import { Html } from "react-konva-utils";
import { useDispatch } from "react-redux";
import { nodeActions } from "../../../store/common/nodeSlice";
import { TextEditor } from "../style";
import DeleteButton from "./common/deleteButton";
import { MakerType } from "./types";

export default function TextMaker({
  shapeProps,
  index,
  shapeRef,
  trRef,
  onSelect,
  onChange,
  isSelected,
}: MakerType) {
  const [dbclick, setDbClick] = useState<boolean>(false);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();
  const onEdit = async () => {
    dispatch(
      nodeActions.modifyNodes({
        index: index,
        modifyProps: { text: textRef.current?.value },
      })
    );
    await shapeRef.current.show(); //show 이후에 dispatch가 반영된다. await를 써도 안 됨.
    setDbClick(false);
  };

  let x = shapeProps.x - 5;
  let y = shapeProps.y - 10;

  return (
    <Group draggable onClick={onSelect} onTap={onSelect} onDragStart={onSelect}>
      <Text
        onDblClick={() => {
          shapeRef.current.hide();
          trRef.current?.hide();
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
            defaultValue={shapeProps.text}
            onBlur={onEdit}
          />
        </Html>
      )}
    </Group>
  );
}