import Konva from "konva";

export type cursorMove =
  | Konva.KonvaEventObject<TouchEvent>
  | Konva.KonvaEventObject<MouseEvent>;
