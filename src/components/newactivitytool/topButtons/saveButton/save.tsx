import { useSelector } from "react-redux";

export const saveJson = (canvas: any) => {
  const json = JSON.stringify(canvas);
  localStorage.setItem("canvasData", json);

  //일반적으로 서버에 저장되지만, 여기서는 임시로 localstorage에 저장.
};
