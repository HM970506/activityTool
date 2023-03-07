import { useRef, useState } from "react";
import { Text, Transformer } from "react-konva";
import { Html } from "react-konva-utils";
import { nodeActions } from "../../../store/common/nodeSlice";
import { TextEditor } from "../style";
import { IsSelected, OnChange, OnSelect } from "./functions";
import { MakerType } from "./types";

export default function TextMaker({
  shapeProps,
  index,
  shapeRef,
  trRef,
}: MakerType) {
  const [dbclick, setDbClick] = useState<boolean>(false);
  const textRef = useRef<HTMLTextAreaElement>(null);

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
    <>
      <Text
        draggable
        onClick={() => {
          OnSelect(index);
        }}
        onDblClick={() => {
          shapeRef.current.hide();
          trRef.current?.hide();
          setDbClick(true);
        }}
        onTap={() => {
          OnSelect(index);
        }}
        onDragStart={() => {
          OnSelect(index);
        }}
        onDragEnd={(e) => {
          OnChange(index, {
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        ref={shapeRef}
        {...shapeProps}
      />
      {IsSelected(index) && <Transformer ref={trRef} />}
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
    </>
  );
}
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
