import { useEffect, useRef, useState } from "react";
import { Group, Text, Transformer } from "react-konva";
import { Html } from "react-konva-utils";
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
  onSelectCheck,
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
    <Group
      draggable={!isDrawing}
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
            width: e.target.scaleX() * e.target.width(),
            height: e.target.scaleY() * e.target.width(),
          });
        }}
        ref={shapeRef}
        {...shapeProps}
      />
      {isSelected && (
        <>
          <Transformer ref={trRef} />
          <DeleteButton
            index={index}
            x={
              shapeRef.current?.x() +
              shapeRef.current?.width() * shapeRef.current?.scaleX()
            }
            y={shapeRef.current?.y()}
          />
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
