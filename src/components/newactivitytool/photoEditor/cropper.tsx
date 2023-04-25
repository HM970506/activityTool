export default function cropper(imageOrdy: any, frameOrdy: any) {
  console.log("imageOrdytype", imageOrdy);
  console.log("frameOrdytype", frameOrdy);

  let returning = null;
  const frame = frameOrdy.getCoords();
  const image = imageOrdy.getCoords();

  if (
    frame[0].x >= image[0].x &&
    frame[0].y >= image[0].y &&
    frame[2].x < image[2].x &&
    frame[2].y < image[2].y
  ) {
    //console.log("중앙");
    returning = {
      cropX: frame[0].x - image[0].x,
      cropY: frame[0].y - image[0].y,
      width: frameOrdy.width * frameOrdy.scaleX,
      height: frameOrdy.height * frameOrdy.scaleY,
    };
  } else if (
    //왼쪽위
    frame[0].x < image[0].x &&
    frame[0].y < image[0].y &&
    frame[2].x < image[2].x &&
    frame[2].y < image[2].y
  ) {
    //console.log("왼쪽위");
    returning = {
      cropX: image[0].x - frame[0].x,
      cropY: image[0].y - frame[0].y,
      width: frame[2].x - image[0].x,
      height: frame[2].y - image[0].y,
    };
  } else if (
    //위
    frame[0].x >= image[0].x &&
    frame[0].y < image[0].y &&
    frame[2].x < image[2].x &&
    frame[2].y < image[2].y
  ) {
    //console.log("위");
    returning = {
      cropX: image[0].x - frame[0].x,
      cropY: frame[0].y - image[0].y,
      width: frame[2].x - frame[0].x,
      height: frame[2].y - image[0].y,
    };
  } else if (
    //오른쪽위
    frame[0].x >= image[0].x &&
    frame[0].y < image[0].y &&
    frame[2].x >= image[2].x &&
    frame[2].y < image[2].y
  ) {
    //console.log("오른쪽위");
    returning = {
      cropX: frame[0].x - image[0].x,
      cropY: image[0].y - frame[0].y,
      width: image[2].x - frame[0].x,
      height: frame[2].y - image[0].y,
    };
  } else if (
    //오른쪽
    frame[0].x >= image[0].x &&
    frame[0].y >= image[0].y &&
    frame[2].x >= image[2].x &&
    frame[2].y < image[2].y
  ) {
    //console.log("오른쪽");
    returning = {
      cropX: frame[0].x - image[0].x,
      cropY: frame[0].y - image[0].y,
      width: image[2].x - frame[0].x,
      height: frame[2].y - frame[0].y,
    };
  } else if (
    //오른쪽아래
    frame[0].x >= image[0].x &&
    frame[0].y >= image[0].y &&
    frame[2].x >= image[2].x &&
    frame[2].y >= image[2].y
  ) {
    //console.log("오른쪽아래");
    returning = {
      cropX: frame[0].x - image[0].x,
      cropY: frame[0].y - image[0].y,
      width: image[2].x - frame[0].x,
      height: image[2].y - frame[0].y,
    };
  } else if (
    //아래
    frame[0].x >= image[0].x &&
    frame[0].y >= image[0].y &&
    frame[2].x < image[2].x &&
    frame[2].y >= image[2].y
  ) {
    //console.log("아래");
    returning = {
      cropX: frame[0].x - image[0].x,
      cropY: frame[0].y - image[0].y,
      width: frame[2].x - frame[0].x,
      height: image[2].y - frame[0].y,
    };
  } else if (
    //왼쪽아래
    frame[0].x < image[0].x &&
    frame[0].y >= image[0].y &&
    frame[2].x < image[2].x &&
    frame[2].y >= image[2].y
  ) {
    //console.log("왼쪽아래");
    returning = {
      cropX: frame[0].x - image[0].x,
      cropY: frame[0].y - image[0].y,
      width: frame[2].x - image[2].x,
      height: image[2].y - frame[0].y,
    };
  } else if (
    //왼쪽
    frame[0].x < image[0].x &&
    frame[0].y >= image[0].y &&
    frame[2].x < image[2].x &&
    frame[2].y < image[2].y
  ) {
    //console.log("왼쪽");
    returning = {
      cropX: image[0].x - frame[0].x,
      cropY: frame[0].y - image[0].y,
      width: image[0].x - frame[2].x,
      height: frame[2].y - frame[0].y,
    };
  } else if (
    //상하
    frame[0].x >= image[0].x &&
    frame[0].y < image[0].y &&
    frame[2].x < image[2].x &&
    frame[2].y >= image[2].y
  ) {
    //console.log("상하");
    returning = {
      cropX: frame[0].x - image[0].x,
      cropY: image[0].y - frame[0].y,
      width: frame[0].x - frame[2].x,
      height: image[0].y - image[2].y,
    };
  } else if (
    //좌우
    frame[0].x < image[0].x &&
    frame[0].y >= image[0].y &&
    frame[2].x >= image[2].x &&
    frame[2].y < image[2].y
  ) {
    //console.log("좌우");
    returning = {
      cropX: frame[0].x - image[0].x,
      cropY: frame[0].y - image[0].y,
      width: image[0].x - image[2].x,
      height: frame[0].y - frame[2].y,
    };
  }

  if (returning)
    returning = {
      cropX: Math.abs(Math.round(returning.cropX)),
      cropY: Math.abs(Math.round(returning.cropY)),
      width: Math.abs(Math.round(returning.width)),
      height: Math.abs(Math.round(returning.height)),
    };

  return returning;
}
