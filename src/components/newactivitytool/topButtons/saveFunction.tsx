import { setSaveData } from "../../firestore/setData";

export const saveJson = async (canvas: any, record: any) => {
  const json = JSON.stringify(canvas);
  await setSaveData(json, record);

  alert("저장되었습니다");
};
