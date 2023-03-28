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
      //투명화 파일만 저장된다.
      //보여줄 때만 템플릿을 적용하여 보여주는게 좋을까?
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
        저장하기
      </DefaultButton>
      <DefaultButton onClick={savePng}>올리기</DefaultButton>
    </>
  );
}
