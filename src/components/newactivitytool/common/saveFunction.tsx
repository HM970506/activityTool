import { canvasType } from "../types";

export const saveJson = async (
  canvas: canvasType,
  record: Blob | undefined,
  path: string
) => {
  const json = JSON.stringify(canvas);

  //여기서 json을 저장합니다

  alert("저장 호출");
};
