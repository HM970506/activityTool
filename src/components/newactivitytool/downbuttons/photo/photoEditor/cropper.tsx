import { fabricObjectType } from "../../../types";

export default function cropper(
  imageOrdy: fabricObjectType,
  frameOrdy: fabricObjectType
) {
  let returning = null;
  const frame = frameOrdy.getCoords();
  const image = imageOrdy.getCoords();

  if (
    frame[0].x >= image[0].x &&
    frame[0].y >= image[0].y &&
    frame[2].x < image[2].x &&
    frame[2].y < image[2].y
  ) {
    console.log("중앙");
    returning = {
      cropX: frame[0].x - image[0].x,
      cropY: frame[0].y - image[0].y,
      width: frameOrdy.width,
      height: frameOrdy.height,
      left: frame[0].x,
      top: frame[0].y,
    };
  } else if (
    //왼쪽위
    frame[0].x < image[0].x &&
    frame[0].y < image[0].y &&
    frame[2].x < image[2].x &&
    frame[2].y < image[2].y
  ) {
    console.log("왼쪽위");
    returning = {
      cropX: image[0].x - frame[0].x,
      cropY: image[0].y - frame[0].y,
      width: frame[2].x - image[0].x,
      height: frame[2].y - image[0].y,
      left: image[0].x,
      top: image[0].y,
    };
  } else if (
    //위
    frame[0].x >= image[0].x &&
    frame[0].y < image[0].y &&
    frame[2].x < image[2].x &&
    frame[2].y < image[2].y
  ) {
    console.log("위");
    returning = {
      cropX: image[0].x - frame[0].x,
      cropY: frame[0].y - image[0].y,
      width: frame[2].x - frame[0].x,
      height: frame[2].y - image[0].y,
      left: frame[0].x,
      top: image[0].y,
    };
  } else if (
    //오른쪽위
    frame[0].x >= image[0].x &&
    frame[0].y < image[0].y &&
    frame[2].x >= image[2].x &&
    frame[2].y < image[2].y
  ) {
    console.log("오른쪽위");
    returning = {
      cropX: frame[0].x - image[0].x,
      cropY: image[0].y - frame[0].y,
      width: image[2].x - frame[0].x,
      height: frame[2].y - image[0].y,
      left: frame[0].x,
      top: image[0].y,
    };
  } else if (
    //오른쪽
    frame[0].x >= image[0].x &&
    frame[0].y >= image[0].y &&
    frame[2].x >= image[2].x &&
    frame[2].y < image[2].y
  ) {
    console.log("오른쪽");
    returning = {
      cropX: frame[0].x - image[0].x,
      cropY: frame[0].y - image[0].y,
      width: image[2].x - frame[0].x,
      height: frame[2].y - frame[0].y,
      left: frame[0].x,
      top: frame[0].y,
    };
  } else if (
    //오른쪽아래
    frame[0].x >= image[0].x &&
    frame[0].y >= image[0].y &&
    frame[2].x >= image[2].x &&
    frame[2].y >= image[2].y
  ) {
    console.log("오른쪽아래");
    returning = {
      cropX: frame[0].x - image[0].x,
      cropY: frame[0].y - image[0].y,
      width: image[2].x - frame[0].x,
      height: image[2].y - frame[0].y,
      left: frame[0].x,
      top: frame[0].y,
    };
  } else if (
    //아래
    frame[0].x >= image[0].x &&
    frame[0].y >= image[0].y &&
    frame[2].x < image[2].x &&
    frame[2].y >= image[2].y
  ) {
    console.log("아래");
    returning = {
      cropX: frame[0].x - image[0].x,
      cropY: frame[0].y - image[0].y,
      width: frame[2].x - frame[0].x,
      height: image[2].y - frame[0].y,
      left: frame[0].x,
      top: frame[0].y,
    };
  } else if (
    //왼쪽아래
    frame[0].x < image[0].x &&
    frame[0].y >= image[0].y &&
    frame[2].x < image[2].x &&
    frame[2].y >= image[2].y
  ) {
    console.log("왼쪽아래");
    returning = {
      cropX: frame[0].x - image[0].x,
      cropY: frame[0].y - image[0].y,
      width: frame[2].x - image[2].x,
      height: image[2].y - frame[0].y,
      left: image[0].x,
      top: frame[0].y,
    };
  } else if (
    //왼쪽
    frame[0].x < image[0].x &&
    frame[0].y >= image[0].y &&
    frame[2].x < image[2].x &&
    frame[2].y < image[2].y
  ) {
    console.log("왼쪽");
    returning = {
      cropX: image[0].x - frame[0].x,
      cropY: frame[0].y - image[0].y,
      width: image[0].x - frame[2].x,
      height: frame[2].y - frame[0].y,
      left: image[0].x,
      top: frame[0].y,
    };
  } else if (
    //상하
    frame[0].x >= image[0].x &&
    frame[0].y < image[0].y &&
    frame[2].x < image[2].x &&
    frame[2].y >= image[2].y
  ) {
    console.log("상하");
    returning = {
      cropX: frame[0].x - image[0].x,
      cropY: image[0].y - frame[0].y,
      width: frame[0].x - frame[2].x,
      height: image[0].y - image[2].y,
      left: image[0].x,
      top: frame[0].y,
    };
  } else if (
    //좌우
    frame[0].x < image[0].x &&
    frame[0].y >= image[0].y &&
    frame[2].x >= image[2].x &&
    frame[2].y < image[2].y
  ) {
    console.log("좌우");
    returning = {
      cropX: frame[0].x - image[0].x,
      cropY: frame[0].y - image[0].y,
      width: image[0].x - image[2].x,
      height: frame[0].y - frame[2].y,
      left: frame[0].x,
      top: image[0].y,
    };
  } else if (
    //아래3면
    frame[0].x < image[0].x &&
    frame[0].y >= image[0].y &&
    frame[2].x >= image[2].x &&
    frame[2].y >= image[2].y
  ) {
    console.log("아래3면");
    returning = {
      cropX: image[0].x - frame[0].x,
      cropY: image[0].y - frame[0].y,
      width: image[2].x - image[0].x,
      height: image[2].y - frame[0].y,
      left: image[0].x,
      top: frame[0].y,
    };
  } else if (
    //우3면
    frame[0].x >= image[0].x &&
    frame[0].y < image[0].y &&
    frame[2].x >= image[2].x &&
    frame[2].y >= image[2].y
  ) {
    console.log("우3면");
    returning = {
      cropX: frame[0].x - image[0].x,
      cropY: image[0].y - frame[0].y,
      width: image[2].x - frame[0].x,
      height: image[2].y - image[0].y,
      left: frame[0].x,
      top: image[0].y,
    };
  } else if (
    //위3면
    frame[0].x < image[0].x &&
    frame[0].y < image[0].y &&
    frame[2].x >= image[2].x &&
    frame[2].y < image[2].y
  ) {
    console.log("위3면");
    returning = {
      cropX: image[0].x - frame[0].x,
      cropY: image[0].y - frame[0].y,
      width: image[2].x - image[0].x,
      height: frame[2].y - image[0].y,
      left: image[0].x,
      top: image[0].y,
    };
  } else if (
    //좌3면
    frame[0].x < image[0].x &&
    frame[0].y < image[0].y &&
    frame[2].x < image[2].x &&
    frame[2].y >= image[2].y
  ) {
    console.log("좌3면");
    returning = {
      cropX: image[0].x - frame[0].x,
      cropY: image[0].y - frame[0].y,
      width: frame[2].x - image[0].x,
      height: image[2].y - image[0].y,
      left: image[0].x,
      top: image[0].y,
    };
  } else {
    console.log("전체");
    returning = {
      cropX: image[0].x - frame[0].x,
      cropY: image[0].y - frame[0].y,
      width: image[2].x - image[0].x,
      height: image[2].y - image[0].y,
      left: image[0].x,
      top: image[0].y,
    };
  }

  const viewport = frameOrdy.canvas?.viewportTransform;

  const coordCorrecting = (value: number) => {
    return viewport
      ? Math.abs(Math.round((value / viewport[0]) * 100) / 100)
      : 0;
  };

  if (returning && viewport) {
    returning = {
      cropX: coordCorrecting(returning.cropX),
      cropY: coordCorrecting(returning.cropY),
      width: returning.width ? coordCorrecting(returning.width) : 1,
      height: returning.height ? coordCorrecting(returning.height) : 1,
      left: coordCorrecting(returning.left - viewport[4]),
      top: coordCorrecting(returning.top - viewport[5]),
    };
  }
  return returning;
}
