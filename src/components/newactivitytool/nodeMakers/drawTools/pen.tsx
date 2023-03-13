import { Line } from "react-konva";

export default function Pen({ shapeProps }: { shapeProps: any }) {
  return (
    <Line
      tension={0.1}
      {...shapeProps}
      lineCap="round"
      shadowForStrokeEnabled={false}
      globalCompositeOperation="source-over"
    />
  );
}
