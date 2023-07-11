import { setSaveData } from "../../api/firestore/setData";
import { canvasType } from "../types";

export const saveJson = async (
  canvas: canvasType,
  record: Blob | undefined
) => {
  const json = JSON.stringify(canvas);

  const path = "/test";
  await setSaveData(json, record, path);

  //아이디 같이 보내기

  alert("저장되었습니다");
};
