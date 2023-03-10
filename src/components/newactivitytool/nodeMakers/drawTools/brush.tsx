import { Line } from "react-konva";

export default function Brush({ shapeProps }: { shapeProps: any }) {
  return (
    <Line
      tension={0.1}
      lineCap="round"
      globalCompositeOperation="source-over"
      {...shapeProps}
      opacity={0.4}
    />
  );
}
