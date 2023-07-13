import { canvasType } from "../types";

export const saveJson = async (
  canvas: canvasType,
  record: Blob | undefined
) => {
  const json = JSON.stringify(canvas);

  alert("저장되었습니다");
};
