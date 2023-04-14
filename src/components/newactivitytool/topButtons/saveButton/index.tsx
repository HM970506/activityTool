import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { DefaultButton } from "../../styles/indexStyle";
import { saveJson } from "./saveFunction";
import { TempLink } from "../../styles/saveButtonstyle";

const INTERVAL_TIME = 10000;

export default function CanvasSave() {
  const { canvas, record } = useSelector((state: any) => state.nodeReducer);
  const linkRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    //saveInterval
  }, []);

  const saveInterval = () => {
    setInterval(() => {
      saveJson(canvas, record);
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

  const saveTemporary = () => {
    saveJson(canvas, record);
  };

  return (
    <>
      <TempLink ref={linkRef} />
      <DefaultButton onClick={saveTemporary}>임시저장</DefaultButton>
      <DefaultButton onClick={savePng}>화면다운</DefaultButton>
    </>
  );
}
