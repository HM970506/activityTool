import { useDispatch, useSelector } from "react-redux";
import { BackButton } from "./style";
import { saveJson } from "../common/saveFunction";
import { ReducersType } from "../types";
import { Dispatch, SetStateAction, useState } from "react";
import { ReactComponent as X } from "./svg/close.svg";
import { nodeActions } from "../../../store/common/nodeSlice";

export default function Back({
  setActivitytools,
}: {
  setActivitytools: Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useDispatch();
  const { canvas, record } = useSelector(
    (state: ReducersType) => state.nodeReducer
  );
  const memberCode = useSelector(
    (state: ReducersType) => state.firestoreReducer.memberCode
  );

  const activityEnd = () => {
    setActivitytools(false);
  };

  const sendToFlutterString = (message: string) => {
    //@ts-ignore
    ForJH.postMessage(message);
  };

  const flutterBack = async () => {
    dispatch(nodeActions.setLoading(true));
    await saveJson(canvas, record, memberCode);
    dispatch(nodeActions.setLoading(false));

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
    </>
  );
}
