import { useSelector } from "react-redux";
import { setSaveDate } from "../../../firestore/setData";

export const saveJson = async (canvas: any, record: null | string) => {
  const json = JSON.stringify(canvas);
  await setSaveDate(json, record);

  alert("저장되었습니다");
};
