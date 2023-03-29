import fabric from "fabric/fabric-impl";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { DefaultButton } from "../../style";
import { saveJson } from "./save";
import { TempLink } from "./style";

export default function CanvasSave() {
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const linkRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    // setInterval(() => {
    //   saveJson();
    // }, 10000);
  }, []);

  const savePng = () => {
    const pngData = canvas.toDataURL("png");
    if (linkRef.current) {
      linkRef.current.href = pngData;
      linkRef.current.download = "test";
      linkRef.current?.click();
    }
  };

  return (
    <>
      <TempLink ref={linkRef} />
      <DefaultButton
        onClick={() => {
          saveJson(canvas);
        }}
      >
        임시저장
      </DefaultButton>
      <DefaultButton onClick={savePng}>화면다운</DefaultButton>
    </>
  );
}
