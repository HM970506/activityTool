import { useSelector } from "react-redux";
import { BackButton, Loading } from "./style";
import { saveJson } from "../common/saveFunction";
import { ReducersType } from "../types";
import { Dispatch, SetStateAction, useState } from "react";
import { ReactComponent as X } from "./svg/close.svg";

export default function Back({
  setActivitytools,
}: {
  setActivitytools: Dispatch<SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const { canvas, record } = useSelector(
    (state: ReducersType) => state.nodeReducer
  );
  const activityEnd = () => {
    setActivitytools(false);
  };

  const sendToFlutterString = (message: string) => {
    //@ts-ignore
    ForJH.postMessage(message);
  };

  const flutterBack = async () => {
    setLoading(true);
    await saveJson(canvas, record);
    setLoading(false);

    const ref = window.location.href.toString();
    if (ref.indexOf("team") === -1) activityEnd();
    else {
      //@ts-ignore
      sendToFlutterString("close_current_view");
    }
  };

  return (
    <>
      <BackButton onClick={flutterBack}>
        <X />
      </BackButton>
      {loading && <Loading>저장중입니다..</Loading>}
    </>
  );
}
