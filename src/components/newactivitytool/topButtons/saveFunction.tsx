import { setSaveRecoder } from "../../api/nodejs";
import { setSaveData } from "../../firestore/setData";
import { canvasType } from "../types";

export const saveJson = async (canvas: canvasType, record: string) => {
  const json = JSON.stringify(canvas);
  await setSaveData(json, record);

  alert("저장되었습니다");
};
