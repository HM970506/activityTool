import { useEffect } from "react";

export default function CanvasSave() {
  useEffect(() => {
    // setInterval(() => {
    //   save();
    // }, 10000);
  }, []);

  const save = () => {
    console.log("저장");
  };

  return (
    <>
      <button onClick={save}>저장하기</button>
    </>
  );
}
