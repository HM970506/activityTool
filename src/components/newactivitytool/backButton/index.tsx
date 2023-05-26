import { useSelector } from "react-redux";
import { BackButton } from "./style";
import { saveJson } from "../common/saveFunction";
import { ReducersType } from "../types";
import { Dispatch, SetStateAction } from "react";
import { ReactComponent as X } from "./svg/close.svg";

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

  const flutterBack = () => {
    // window.closeCurrent = () => {
    //   sendToFlutterString("close_current_view");
    //   ForJH.postMessage(message);
    // };
  };

  return (
    <BackButton onClick={flutterBack}>
      <X />
    </BackButton>
  );
}
