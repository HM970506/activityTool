import { Group } from "react-konva";
import { Html } from "react-konva-utils";

export default function RecordMaker({ shapeProps }: { shapeProps: any }) {
  let x = shapeProps.x - 5;
  let y = shapeProps.y - 10;
  return (
    <Group draggable>
      <Html groupProps={{ x, y }}>
        <audio src={shapeProps.audioSrc} controls={true} />
      </Html>
    </Group>
  );
}
