import { setSaveData } from "../../api/firestore/setData";
import { canvasType } from "../types";

export const saveJson = async (
  canvas: canvasType,
  record: Blob | undefined
) => {
  const json = JSON.stringify(canvas);
  await setSaveData(json, record);

  alert("저장되었습니다");
};
