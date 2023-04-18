import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { DefaultButton } from "../styles/indexStyle";
import { saveJson } from "./saveFunction";
import { TempLink } from "../styles/saveButtonstyle";
import { ReducersType } from "../types";
import { setAudioDate } from "../../firestore/setData";

const INTERVAL_TIME = 10000;

export default function CanvasSave() {
  const { canvas, record } = useSelector(
    (state: ReducersType) => state.nodeReducer
  );

  const linkRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    //saveInterval()
  }, []);

  const saveInterval = () => {
    setInterval(() => {
      saveJson(canvas);
    }, INTERVAL_TIME);
  };

  const savePng = () => {
    const pngData = canvas.toDataURL("png");
    if (linkRef.current) {
      linkRef.current.href = pngData;
      linkRef.current.download = "test";
      linkRef.current?.click();
    }
  };

  const saveTemporary = async () => {
    if (record != undefined) await setAudioDate(record);
    saveJson(canvas);
  };

  return (
    <>
      <TempLink ref={linkRef} />
      <DefaultButton onClick={saveTemporary}>임시저장</DefaultButton>
      <DefaultButton onClick={savePng}>화면다운</DefaultButton>
    </>
  );
}
