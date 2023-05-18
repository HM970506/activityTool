import { useSelector } from "react-redux";
import { BackButton } from "./style";
import { saveJson } from "../common/saveFunction";
import { ReducersType } from "../types";
import { Dispatch, SetStateAction } from "react";

export default function Back({
  setActivitytools,
}: {
  setActivitytools: Dispatch<SetStateAction<boolean>>;
}) {
  const { canvas, record } = useSelector(
    (state: ReducersType) => state.nodeReducer
  );
  const activityEnd = () => {
    setActivitytools(false);
    saveToJson();
  };

  const saveToJson = async () => {
    await saveJson(canvas, record);
  };

  return <BackButton onClick={activityEnd}>백버튼</BackButton>;
}
