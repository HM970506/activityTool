import fabric from "fabric/fabric-impl";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function CanvasSave() {
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const linkRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    // setInterval(() => {
    //   saveJson();
    // }, 10000);
  }, []);

  const saveJson = () => {
    const json = JSON.stringify(canvas);
    localStorage.setItem("canvasData", json);

    //일반적으로 서버에 저장되지만, 여기서는 임시로 localstorage에 저장.
  };

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
      <a ref={linkRef}>임시</a>
      <button onClick={saveJson}>저장하기</button>
      <button onClick={savePng}>올리기</button>
    </>
  );
}
