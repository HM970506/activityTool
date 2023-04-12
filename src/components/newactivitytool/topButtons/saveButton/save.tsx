import { useSelector } from "react-redux";
import { setSaveDate } from "../../../firestore/setData";

export const saveJson = async (canvas: any) => {
  const json = JSON.stringify(canvas);
  await setSaveDate(json, null);

  alert("저장되었습니다");
};
