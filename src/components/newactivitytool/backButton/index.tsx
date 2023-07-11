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
  const activityEnd = () => {
    setActivitytools(false);
  };

  const sendToFlutterString = (message: string) => {
    //@ts-ignore
    ForJH.postMessage(message);
  };

  const flutterBack = () => {
    const ref = window.location.href.toString();
    if (ref.indexOf("team") === -1) activityEnd();
    else {
      //@ts-ignore
      sendToFlutterString("close_current_view");
    }
  };

  return (
    <BackButton onClick={flutterBack}>
      <X />
    </BackButton>
  );
}
